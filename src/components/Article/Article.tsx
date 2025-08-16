import { ArticleProps } from "./Article.types";

export const Article = ({ children, className = "" }: ArticleProps) => {
  return (
    <article className={`max-w-[700px] mx-auto ${className}`}>
      {children}
    </article>
  );
};
