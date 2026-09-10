import { Link } from "react-router-dom";
import { trackEvent } from "@/hooks/useSiteSettings";

const variants = {
  primary: "cta-primary",
  secondary: "cta-secondary",
  dark: "cta-dark",
  white: "cta-white",
  ghostLight: "cta-ghost",
  whatsapp: "cta-whatsapp",
};

const sizes = { sm: "cta-sm", md: "cta-md", lg: "cta-lg" };

export default function CTAButton({
  children,
  to,
  href,
  onClick,
  variant = "primary",
  size = "md",
  eventName,
  eventParams,
  className = "",
  ...rest
}) {
  const classes = [
    "cta-button",
    variants[variant] || variants.primary,
    sizes[size] || sizes.md,
    className,
  ].filter(Boolean).join(" ");

  const handleClick = (e) => {
    if (eventName) trackEvent(eventName, eventParams || {});
    if (onClick) onClick(e);
  };

  if (to) return <Link to={to} className={classes} onClick={handleClick} {...rest}>{children}</Link>;
  if (href) return <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className={classes} onClick={handleClick} {...rest}>{children}</a>;
  return <button className={classes} onClick={handleClick} {...rest}>{children}</button>;
}
