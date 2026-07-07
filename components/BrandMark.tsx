/* eslint-disable @next/next/no-img-element */
type Props = { size?: number; spinning?: boolean; className?: string };

/** Logotipo circular oficial de Dan Creative (public/brand/dan-creative-logo.jpeg). */
export default function BrandMark({ size = 160, spinning = false, className = "" }: Props) {
  return (
    <img
      src="/brand/dan-creative-logo.jpeg"
      alt="Dan Creative"
      width={size}
      height={size}
      className={`rounded-full object-cover ${spinning ? "vinyl-spinning" : ""} ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
