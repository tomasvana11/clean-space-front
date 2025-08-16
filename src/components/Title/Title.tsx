/*
import { TitleProps, TitleLevel } from "./Title.types";

const titleStyles: Record<TitleLevel, string> = {
  h1: "title-h1",
  h2: "title-h2",
  h3: "title-h3",
  h4: "title-h4",
  h5: "title-h5",
  h6: "title-h6",
};

export const Title = ({ as, children, className = "" }: TitleProps) => {
  const Component = as;
  const baseStyles = titleStyles[as];

  return (
    <Component className={`${baseStyles} ${className}`}>{children}</Component>
  );
};
*/
import { TitleProps, TitleLevel } from "./Title.types";

const titleStyles: Record<TitleLevel, string> = {
  h1: "title-h1",
  h2: "title-h2",
  h3: "title-h3",
  h4: "title-h4",
  h5: "title-h5",
  h6: "title-h6",
};

export const Title = ({ as, children, locale, className = "" }: TitleProps) => {
  const Component = as;
  const baseStyles = titleStyles[as];
  const russianClass = locale === "ru" ? "title-russian" : "";

  return (
    <Component className={`${baseStyles} ${russianClass} ${className}`}>
      {children}
    </Component>
  );
};
