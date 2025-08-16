import Link from "next/link";
import { Image } from "@/components/Image";
import { SocialButtonProps, SocialButtonVariant } from "./SocialButton.types";

const variantStyles: Record<
  SocialButtonVariant,
  {
    container: string;
    text: string;
    hover: string;
  }
> = {
  light: {
    container: "bg-white ",
    text: "text-[#372900]",
    hover: "hover:bg-white/85",
  },
  dark: {
    container: "bg-gray-800 border border-gray-700",
    text: "text-white",
    hover: "hover:bg-gray-700",
  },
};

export const SocialButton = ({
  href,
  icon,
  label,
  variant = "light",
  className = "",
  external = true,
}: SocialButtonProps) => {
  const styles = variantStyles[variant];

  const buttonContent = (
    <div
      className={`
      flex flex-row gap-2 md:gap-3 items-center 
      p-4 md:p-5 
      ${styles.container} 
      ${styles.hover} 
      transition-colors duration-200 
      rounded-lg md:rounded-xl
      ${className}
    `}
    >
      <Image
        src={icon}
        alt={`${label} Logo`}
        width={32}
        height={32}
        className="h-6 md:h-8 w-auto flex-shrink-0"
      />
      <span className={`${styles.text} font-semibold`}>{label}</span>
    </div>
  );

  // Externí link
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        {buttonContent}
      </a>
    );
  }

  // Interní link
  return (
    <Link href={href} className="inline-block">
      {buttonContent}
    </Link>
  );
};
