import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Card from "../Card/Card";

export const MarkdownLoader = ({ path }) => {
  const [markdownContent, setMarkdownContent] = useState("");
  const absolutePath = new URL(path, import.meta.url).href;

  useEffect(() => {
    console.log("Fetching markdown from:", absolutePath);
    fetch(absolutePath)
      .then((response) => response.text())
      .then((text) => {
        setMarkdownContent(text);
      })
      .catch((err) => console.error(err));
  }, [absolutePath]);

  return <ReactMarkdown>{markdownContent}</ReactMarkdown>;
};
