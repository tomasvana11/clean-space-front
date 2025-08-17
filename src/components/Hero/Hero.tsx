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
      {/* Overlay pro lepší čitelnost textu */}
      {overlay && (
        <div className="absolute inset-0 bg-[#1A1A1A]/50 backdrop-blur-md"></div>
      )}

      {/* Obsah */}
      <div className="relative z-10 w-full pt-[72px] md:pt-[96px] pb-[100px] md:pb-[150px]">
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
