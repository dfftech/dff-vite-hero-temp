"use client";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownViewerProps {
  markdownText: string;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ markdownText }) => {
  const [markdownContent, setMarkdownContent] = useState<string>("");

  useEffect(() => {
    setMarkdownContent("**Loading...**");
    setMarkdownContent(markdownText);
  }, [markdownText]);

  return (
    <div className="mx-auto p-4 bg-white rounded-lg shadow-md text-justify">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownViewer;
