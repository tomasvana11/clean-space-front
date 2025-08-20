import { HeroProps } from "./Hero.types";
import { ContentWrapper } from "@/components/ContentWrapper";
import { Title } from "@/components/Title";

export const Hero = ({
  backgroundImage,
  title,
  locale,
  children,
  className = "",
  titleAs = "h1",
  minHeight = "min-h-[300px] md:min-h-[500px]",
  blurred = true,
  overlay = true,
}: HeroProps) => {
  return (
    <section
      className={`
        relative 
        ${minHeight} 
        bg-cover bg-center bg-no-repeat 
        flex justify-center
        ${className}
      `}
      style={{
        backgroundImage: `url('${backgroundImage}')`,
      }}
    >
      {overlay && (
        <div
          className={`
      absolute inset-0 bg-[#1A1A1A]/50 
      ${blurred ? "backdrop-blur-md" : ""}
    `}
        ></div>
      )}

      {/* Obsah */}
      <div className="relative z-10 w-full pt-[96px] lg:pt-[128px] pb-[128px] md:pb-[180px]">
        <ContentWrapper>
          <div className="text-center text-white py-10 md:py-14">
            <Title as={titleAs} locale={locale} className="text-white">
              {title}
            </Title>
            {children}
          </div>
        </ContentWrapper>
      </div>
    </section>
  );
};
