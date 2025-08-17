import { LayoutProps } from "./Layout.types";
import { Footer } from "@/components/Footer";

export const Layout = ({ children, locale, className = "" }: LayoutProps) => {
  return (
    <div
      className={`min-h-screen ${className}`}
      style={{ backgroundColor: "#f1f1f3" }}
    >
      <main className="mx-auto min-h-screen">{children}</main>
      <Footer locale={locale} />
    </div>
  );
};
