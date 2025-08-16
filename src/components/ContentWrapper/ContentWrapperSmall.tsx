import { ContentWrapperSmallProps } from "./ContentWrapper.types";

export const ContentWrapperSmall = ({
  children,
  className = "",
}: ContentWrapperSmallProps) => {
  return (
    <div className={`max-w-[1056px] mx-auto ${className}`}>{children}</div>
  );
};
