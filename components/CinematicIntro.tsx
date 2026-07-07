"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * ESCENA 1 — INTRO (Three.js + GSAP) · version pulida
 * - El vinilo emerge de la oscuridad (fade + escala) bajo luz de estudio
 * - Reflexiones reales (environment map) sobre los surcos
 * - Un destello especular orbita el disco y desacelera junto con el giro
 * - Micro-deriva de camara tipo steadicam que se asienta antes del dolly
 * - Micro-wobble fisico del disco (excentricidad de tornamesa)
 * - Beat de silencio, destello en la costura y apertura de cortinas
 * - El vinilo se funde y solo queda la etiqueta = logo del hero
 */

function makeVinylTexture(): THREE.CanvasTexture {
  const size = 1024;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#0a0a0c";
  ctx.fillRect(0, 0, size, size);
  const cx = size / 2;
  for (let r = 158; r < 506; r += 2.1) {
    ctx.beginPath();
    ctx.arc(cx, cx, r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255,255,255,${0.018 + Math.random() * 0.045})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  for (const r of [190, 262, 338, 414, 478]) {
    ctx.beginPath();
    ctx.arc(cx, cx, r, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,255,255,0.09)";
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(cx, cx, 505, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255,255,255,0.14)";
  ctx.lineWidth = 3;
  ctx.stroke();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

export default function CinematicIntro() {
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const seamRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }
    document.body.style.overflow = "hidden";

    const canvas = canvasRef.current!;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const scene = new THREE.Scene();

    // Reflexiones de estudio reales sobre el vinilo
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;
    scene.environmentIntensity = 0.35;

    const FOV = 35;
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);
    const TAN2 = 2 * Math.tan((FOV * Math.PI) / 360);
    let zStart = 10;
    let zEnd = 6;
    const setSize = () => {
      const W = window.innerWidth, H = window.innerHeight;
      renderer.setSize(W, H);
      camera.aspect = W / H;
      zStart = (2.6 * H) / (340 * TAN2);
      zEnd = (0.9 * H) / (220 * TAN2);
      camera.updateProjectionMatrix();
    };
    setSize();
    window.addEventListener("resize", setSize);
    camera.position.z = zStart;

    // Iluminacion
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const key = new THREE.DirectionalLight(0xffffff, 2.0);
    key.position.set(4, 6, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x9db4ff, 1.0);
    rim.position.set(-5, -2, 4);
    scene.add(rim);
    const sheen = new THREE.PointLight(0xffffff, 7, 14);
    sheen.position.set(2.5, 2.5, 3);
    scene.add(sheen);

    // Vinilo
    const grooves = makeVinylTexture();
    const vinylFace = new THREE.MeshStandardMaterial({ map: grooves, roughness: 0.28, metalness: 0.6, transparent: true, opacity: 0 });
    const vinylEdge = new THREE.MeshStandardMaterial({ color: 0x0a0a0c, roughness: 0.5, metalness: 0.3, transparent: true, opacity: 0 });
    const discGeo = new THREE.CylinderGeometry(1.3, 1.3, 0.07, 128);
    discGeo.rotateX(Math.PI / 2);
    const disc = new THREE.Mesh(discGeo, [vinylEdge, vinylFace, vinylFace]);

    // Etiqueta (logo en planos circulares: orientacion garantizada)
    const logoTex = new THREE.TextureLoader().load("/brand/dan-creative-logo.jpeg");
    logoTex.colorSpace = THREE.SRGBColorSpace;
    logoTex.anisotropy = 8;
    const labelGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.078, 96);
    labelGeo.rotateX(Math.PI / 2);
    const labelBlue = new THREE.MeshStandardMaterial({ color: 0x173b8f, roughness: 0.6, transparent: true, opacity: 0 });
    const label = new THREE.Mesh(labelGeo, labelBlue);
    const faceGeo = new THREE.CircleGeometry(0.449, 96);
    const faceMat = new THREE.MeshBasicMaterial({ map: logoTex, transparent: true, opacity: 0 });
    const labelFront = new THREE.Mesh(faceGeo, faceMat);
    labelFront.position.z = 0.078 / 2 + 0.002;
    const labelBack = new THREE.Mesh(faceGeo, faceMat);
    labelBack.rotation.y = Math.PI;
    labelBack.position.z = -(0.078 / 2 + 0.002);

    // Perno
    const holeGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.09, 24);
    holeGeo.rotateX(Math.PI / 2);
    const holeMat = new THREE.MeshStandardMaterial({ color: 0x05050a, roughness: 0.9, transparent: true, opacity: 0 });
    const hole = new THREE.Mesh(holeGeo, holeMat);

    const spinGroup = new THREE.Group();
    spinGroup.add(disc, label, labelFront, labelBack, hole);
    const tiltGroup = new THREE.Group();
    tiltGroup.add(spinGroup);
    tiltGroup.rotation.set(-0.5, 0.3, 0);
    tiltGroup.scale.setScalar(0.94);
    scene.add(tiltGroup);

    // Render loop con micro-wobble fisico (excentricidad de tornamesa)
    const clock = new THREE.Clock();
    let wobble = 1; // se atenua a 0 al detenerse
    let alive = true;
    const render = () => {
      if (!alive) return;
      const t = clock.getElapsedTime();
      spinGroup.position.z = Math.sin(t * 9) * 0.006 * wobble;
      spinGroup.rotation.x = Math.sin(t * 7) * 0.006 * wobble;
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    // --- Linea de tiempo ---
    const allMats = [vinylFace, vinylEdge, labelBlue, faceMat, holeMat];
    const wobbleProxy = { v: 1 };
    const orbit = { a: Math.atan2(2.5, 2.5) };

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setDone(true);
      },
    });

    // 0 · El vinilo emerge de la oscuridad
    tl.to(allMats, { opacity: 1, duration: 0.9, ease: "power2.out" }, 0);
    tl.to(tiltGroup.scale, { x: 1, y: 1, z: 1, duration: 1.4, ease: "power3.out" }, 0);
    tl.to(glowRef.current, { autoAlpha: 0.4, duration: 1.2, ease: "power2.out" }, 0.1);

    // 0–3.8 · Giro que desacelera organicamente, aterrizando en 3 vueltas exactas
    tl.to(spinGroup.rotation, { z: -Math.PI * 6, duration: 3.8, ease: "power2.out" }, 0);
    // El destello especular orbita el disco y frena junto con el
    tl.to(orbit, {
      a: orbit.a + Math.PI * 3.2,
      duration: 3.8,
      ease: "power2.out",
      onUpdate: () => {
        sheen.position.x = Math.cos(orbit.a) * 3.2;
        sheen.position.y = Math.sin(orbit.a) * 2.6;
      },
    }, 0);
    // Tilt que respira
    tl.to(tiltGroup.rotation, { x: -0.28, y: -0.3, duration: 2.2, ease: "sine.inOut" }, 0);
    // Micro-deriva de camara tipo steadicam
    tl.to(camera.position, { x: 0.07, y: -0.045, duration: 2.6, ease: "sine.inOut" }, 0.2);

    // 2.6 · Se endereza; el wobble fisico se disipa
    tl.to(tiltGroup.rotation, { x: 0, y: 0, duration: 0.9, ease: "power3.inOut" }, 2.6);
    tl.to(wobbleProxy, { v: 0, duration: 1.1, ease: "power2.out", onUpdate: () => (wobble = wobbleProxy.v) }, 2.7);

    // 2.9 · Dolly-in hacia la etiqueta; la camara se asienta perfectamente al centro
    tl.to(camera.position, { x: 0, y: 0, z: () => zEnd, duration: 1.2, ease: "power2.inOut" }, 2.9);
    tl.to(glowRef.current, { autoAlpha: 0.55, scale: 1.15, duration: 1.2, ease: "power2.inOut" }, 2.9);

    // 4.0 · Beat — destello en la costura y apertura de cortinas
    tl.fromTo(seamRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.22, ease: "power1.in" }, 3.85);
    tl.to(seamRef.current, { autoAlpha: 0, duration: 0.6, ease: "power2.out" }, 4.15);
    tl.to(leftRef.current, { xPercent: -100, duration: 1.35, ease: "expo.inOut" }, 4.05);
    tl.to(rightRef.current, { xPercent: 100, duration: 1.35, ease: "expo.inOut" }, 4.05);
    // El vinilo se funde: solo queda la etiqueta (= logo del hero)
    tl.to([vinylFace, vinylEdge, holeMat], { opacity: 0, duration: 0.9, ease: "power2.inOut" }, 4.05);
    tl.to([glowRef.current, vignetteRef.current], { autoAlpha: 0, duration: 0.9, ease: "power2.out" }, 4.2);

    // 5.35 · Traspaso invisible al logo del hero
    tl.to(rootRef.current, { autoAlpha: 0, duration: 0.35 }, 5.35);

    return () => {
      alive = false;
      window.removeEventListener("resize", setSize);
      tl.kill();
      [discGeo, labelGeo, faceGeo, holeGeo].forEach((g) => g.dispose());
      allMats.forEach((m) => m.dispose());
      grooves.dispose();
      logoTex.dispose();
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[100]" aria-hidden="true">
      <div ref={leftRef} className="absolute inset-y-0 left-0 w-1/2 bg-ink">
        {/* Borde fisico de la cortina */}
        <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black/60 to-transparent" />
      </div>
      <div ref={rightRef} className="absolute inset-y-0 right-0 w-1/2 bg-ink">
        <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black/60 to-transparent" />
      </div>
      {/* Halo azul que respira detras del disco */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0"
        style={{ background: "radial-gradient(circle, rgba(64,105,220,0.5) 0%, rgba(23,59,143,0.18) 40%, transparent 68%)" }}
      />
      {/* Destello de la costura central */}
      <div
        ref={seamRef}
        className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 opacity-0"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(157,180,255,0.9), transparent)", boxShadow: "0 0 24px 2px rgba(120,150,255,0.55)" }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* Viñeta cinematografica */}
      <div
        ref={vignetteRef}
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 52%, rgba(0,0,0,0.55) 100%)" }}
      />
    </div>
  );
}
