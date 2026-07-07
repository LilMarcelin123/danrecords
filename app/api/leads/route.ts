import { NextResponse } from "next/server";

/**
 * Recibe los formularios del sitio (Cliente / Editor / Booking) y envia un
 * reporte por correo a Dan via Resend (https://resend.com).
 *
 * Variables de entorno (ver .env.example):
 *  - RESEND_API_KEY   API key de Resend
 *  - LEAD_TO_EMAIL    correo de Dan (destinatario del reporte)
 *  - LEAD_FROM_EMAIL  remitente (opcional; default onboarding@resend.dev)
 */

const FIELD_LABELS: Record<string, string> = {
  nombre: "Nombre",
  nombreArtistico: "Nombre artístico / empresa",
  correo: "Correo",
  telefono: "Teléfono",
  pais: "País",
  tipoProyecto: "Tipo de proyecto",
  servicios: "Servicios requeridos",
  descripcion: "Descripción",
  edad: "Edad",
  redes: "Redes sociales",
  portafolio: "Portafolio",
  experiencia: "Experiencia",
  motivacion: "Motivación",
  mensaje: "Mensaje",
  artist: "Artista",
};

const ROLE_TITLES: Record<string, string> = {
  cliente: "Nuevo cliente potencial",
  editor: "Nueva aplicación de editor",
  booking: "Nueva solicitud de contratación",
};

function esc(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildReportHtml(role: string, lead: Record<string, unknown>): string {
  const title = ROLE_TITLES[role] ?? "Nuevo registro";
  const when = new Date().toLocaleString("es-MX", {
    timeZone: "America/Mexico_City",
    dateStyle: "full",
    timeStyle: "short",
  });

  const rows = Object.entries(lead)
    .filter(([k, v]) => k !== "role" && v !== "" && v != null)
    .map(
      ([k, v]) => `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #e3e6ef;color:#5c6478;font-size:13px;white-space:nowrap;">
            ${esc(FIELD_LABELS[k] ?? k)}
          </td>
          <td style="padding:10px 14px;border-bottom:1px solid #e3e6ef;color:#101a38;font-size:14px;">
            ${esc(v)}
          </td>
        </tr>`
    )
    .join("");

  return `
  <div style="background:#f3f5fb;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e3e6ef;">
      <div style="background:#173B8F;padding:22px 24px;">
        <p style="margin:0;color:#ffffff;font-size:12px;letter-spacing:3px;">DANRECORDS</p>
        <h1 style="margin:6px 0 0;color:#ffffff;font-size:20px;">${esc(title)}</h1>
      </div>
      <table style="width:100%;border-collapse:collapse;">${rows}</table>
      <div style="padding:16px 24px;background:#fbfbfa;">
        <p style="margin:0;color:#5c6478;font-size:12px;">Recibido el ${esc(when)} · danrecords.com</p>
      </div>
    </div>
  </div>`;
}

export async function POST(request: Request) {
  let lead: Record<string, unknown>;
  try {
    lead = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 });
  }

  const role = String(lead.role ?? "");
  if (!lead.nombre || !lead.correo) {
    return NextResponse.json({ ok: false, error: "Faltan campos obligatorios" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;

  // Sin credenciales configuradas: registrar en logs y no romper el flujo del usuario
  if (!apiKey || !to) {
    console.warn("[DanRecords] RESEND_API_KEY / LEAD_TO_EMAIL sin configurar. Lead solo en logs:");
    console.log(JSON.stringify(lead, null, 2));
    return NextResponse.json({ ok: true, delivered: false });
  }

  const subjectRole = ROLE_TITLES[role] ?? "Nuevo registro";
  const subject =
    role === "booking" && lead.artist
      ? `${subjectRole} — ${lead.artist} (${lead.nombre})`
      : `${subjectRole} — ${lead.nombre}`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.LEAD_FROM_EMAIL ?? "DanRecords <onboarding@resend.dev>",
      to: [to],
      reply_to: String(lead.correo),
      subject,
      html: buildReportHtml(role, lead),
    }),
  });

  if (!res.ok) {
    console.error("[DanRecords] Error enviando reporte:", await res.text());
    return NextResponse.json({ ok: false, error: "No se pudo enviar el reporte" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, delivered: true });
}
