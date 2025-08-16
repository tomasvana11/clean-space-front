import Link from "next/link";
import Image from "next/image";
import { ContactBoxProps, ContactBoxVariant } from "./ContactBox.types";

const variantStyles: Record<
  ContactBoxVariant,
  {
    container: string;
    iconSize: { mobile: number; desktop: number };
    textSize: string;
  }
> = {
  big: {
    container: "flex items-center gap-2 md:gap-4 p-2 md:p-4",
    iconSize: { mobile: 24, desktop: 28 },
    textSize: "text-base md:text-lg font-medium",
  },
  small: {
    container: "flex items-center gap-1 md:gap-2 p-1 md:p-2",
    iconSize: { mobile: 24, desktop: 28 },
    textSize: "text-base md:text-lg font-semibold",
  },
};

export const ContactBox = ({
  variant,
  icon,
  text,
  href,
  className = "",
}: ContactBoxProps) => {
  const styles = variantStyles[variant];

  return (
    <Link href={href} className={`${styles.container} ${className}`}>
      {/* Mobile ikona */}
      <Image
        src={icon}
        alt=""
        width={styles.iconSize.mobile}
        height={styles.iconSize.mobile}
        className="flex-shrink-0 md:hidden"
      />

      {/* Desktop ikona */}
      <Image
        src={icon}
        alt=""
        width={styles.iconSize.desktop}
        height={styles.iconSize.desktop}
        className="flex-shrink-0 hidden md:block"
      />

      <span className={styles.textSize}>{text}</span>
    </Link>
  );
};
