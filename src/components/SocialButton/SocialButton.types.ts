export type SocialButtonVariant = "light" | "dark";

export interface SocialButtonProps {
  href: string;
  icon: string;
  label: string;
  variant?: SocialButtonVariant;
  className?: string;
  external?: boolean;
}
