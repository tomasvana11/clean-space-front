import Link from "next/link";
import Image from "next/image";
import { ContactBoxProps, ContactBoxVariant } from "./ContactBox.types";
import { t } from "@/utils/i18n";

const variantStyles: Record<
  ContactBoxVariant,
  {
    container: string;
    iconSize: { mobile: number; desktop: number };
    textSize: string;
    wrapper: string;
    title: string;
    description: string;
    info: string;
  }
> = {
  big: {
    wrapper:
      "flex flex-col gap-5 py-8 px-4 hover:bg-gray-100 transition-colors duration-200 border-t border-gray-300",
    info: "flex flex-col",
    title: "text-base text-gray-800 font-medium",
    description: "text-sm text-gray-700 italic",
    container: "flex items-center gap-2 md:gap-4 ",
    iconSize: { mobile: 32, desktop: 36 },
    textSize: "text-lg md:text-xl font-semibold",
  },
  small: {
    wrapper: "",
    info: "",
    title: "",
    description: "",
    container: "flex items-center gap-1 md:gap-2 p-2",
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
  title,
  description,
  locale,
}: ContactBoxProps) => {
  const styles = variantStyles[variant];

  return (
    <>
      <div className={`${styles.wrapper} ${className}`}>
        <div className={`${styles.info} ${className}`}>
          {title && (
            <span className={`${styles.title} ${className}`}>
              {t(locale, title)}
            </span>
          )}
          {description && (
            <span className={`${styles.description} ${className}`}>
              {t(locale, description)}
            </span>
          )}
        </div>
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
      </div>
    </>
  );
};
