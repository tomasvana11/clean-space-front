import { ReactNode } from "react";
import { Title } from "@/components/Title";
import { Locale } from "@/utils/i18n";

interface StrapiBlock {
  type: string;
  format?: string;
  level?: number;
  children: Array<{
    type: string;
    text?: string;
    url?: string;
    children?: Array<{
      type: string;
      text: string;
      bold?: boolean;
      italic?: boolean;
      underline?: boolean;
      strikethrough?: boolean;
    }>;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
  }>;
}

const formatText = (child: any): ReactNode => {
  if (child.type === "link") {
    const linkText =
      child.children?.map((linkChild: any, index: number) => {
        let text = linkChild.text || "";
        if (linkChild.bold) return <strong key={index}>{text}</strong>;
        if (linkChild.italic) return <em key={index}>{text}</em>;
        if (linkChild.underline) return <u key={index}>{text}</u>;
        if (linkChild.strikethrough) return <s key={index}>{text}</s>;
        return text;
      }) || [];

    return (
      <a
        href={child.url}
        className="text-[#DB8A00]  hover:text-[#FFA000] underline transition-colors duration-200"
        target="_blank"
        rel="noopener noreferrer"
      >
        {linkText}
      </a>
    );
  }

  // Běžný text
  let text = child.text || "";
  if (child.bold) return <strong>{text}</strong>;
  if (child.italic) return <em>{text}</em>;
  if (child.underline) return <u>{text}</u>;
  if (child.strikethrough) return <s>{text}</s>;

  return text;
};

export const renderStrapiContent = (
  content: StrapiBlock[],
  locale: string
): ReactNode[] => {
  return content.map((block, index) => {
    switch (block.type) {
      case "paragraph":
        const paragraphText = block.children.map((child, i) => (
          <span key={i}>{formatText(child)}</span>
        ));
        return (
          <p key={index} className="mb-2">
            {paragraphText}
          </p>
        );

      case "list":
        const listItems = block.children.map((listItem, i) => {
          if (listItem.type === "list-item") {
            const itemText =
              listItem.children?.map((child, j) => (
                <span key={j}>{formatText(child)}</span>
              )) || [];
            return <li key={i}>{itemText}</li>;
          }
          return null;
        });

        if (block.format === "unordered") {
          return (
            <ul key={index} className="list-disc list-inside mb-2 ml-4">
              {listItems}
            </ul>
          );
        } else {
          return (
            <ol key={index} className="list-decimal list-inside mb-2 ml-4">
              {listItems}
            </ol>
          );
        }

      case "heading":
        const headingText = block.children.map((child, i) => (
          <span key={i}>{formatText(child)}</span>
        ));
        const level = block.level || 1;
        const titleAs = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

        return (
          <Title
            key={index}
            as={titleAs}
            locale={locale}
            className="mb-2 mt-8 text-[#1C1C1C] opacity-90"
          >
            {headingText}
          </Title>
        );

      case "quote":
        const quoteText = block.children.map((child, i) => (
          <span key={i}>{formatText(child)}</span>
        ));
        return (
          <blockquote
            key={index}
            className="border-l-4 border-gray-300 pl-4 italic my-4"
          >
            {quoteText}
          </blockquote>
        );

      case "code":
        const codeText = block.children.map((child) => child.text).join("");
        return (
          <pre
            key={index}
            className="bg-gray-100 p-4 rounded mb-4 overflow-x-auto"
          >
            <code>{codeText}</code>
          </pre>
        );

      default:
        console.log("Unknown block type:", block.type, block);
        const defaultText = block.children.map((child, i) => (
          <span key={i}>{formatText(child)}</span>
        ));
        return (
          <div key={index} className="mb-4">
            {defaultText}
          </div>
        );
    }
  });
};
