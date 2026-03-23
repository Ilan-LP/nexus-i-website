import logoFill from "../assets/Logo-Fill.png";
import logoTransparent from "../assets/Logo-Transparent.png";

const LOGO_BY_VARIANT = {
  fill: logoFill,
  transparent: logoTransparent,
};

export default function LogoPlaceholder({
  className = "",
  variant = "transparent",
  alt = "Nexus-I logo",
}) {
  const src = LOGO_BY_VARIANT[variant] || logoTransparent;

  return (
    <img
      src={src}
      alt={alt}
      width="36"
      height="36"
      className={`h-8 w-8 object-contain ${className}`.trim()}
    />
  );
}
