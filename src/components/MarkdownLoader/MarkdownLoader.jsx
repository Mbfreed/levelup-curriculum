import { useEffect, useState } from "react";

export const MarkdownLoader = ({ path }) => {
  const [markdownContent, setMarkdownContent] = useState("");

  useEffect(() => {
    fetch(path)
      .then((response) => response.text())
      .then((text) => setMarkdownContent(text))
      .catch((err) => console.error(err));
  }, [path]);

  return <ReactMarkdown>{markdownContent}</ReactMarkdown>;
};
