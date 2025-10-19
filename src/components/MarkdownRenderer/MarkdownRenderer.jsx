import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./MarkdownRenderer.module.css";

const MarkdownRenderer = ({ content, className = "" }) => {
  return (
    <div className={`${styles.markdownContainer} ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} className={styles.markdown}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;

