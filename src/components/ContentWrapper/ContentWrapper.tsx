import { ContentWrapperProps } from "./ContentWrapper.types";

export const ContentWrapper = ({
  children,
  className = "",
}: ContentWrapperProps) => {
  return (
    <div className={`max-w-[1212px] mx-auto px-4 ${className}`}>{children}</div>
  );
};
