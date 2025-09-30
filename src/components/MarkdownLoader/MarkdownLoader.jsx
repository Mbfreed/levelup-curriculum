import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Card from "../Card/Card";

export const MarkdownLoader = ({ path }) => {
  const [markdownContent, setMarkdownContent] = useState("");

  useEffect(() => {
    fetch(path)
      .then((response) => response.text())
      .then((text) => {
        console.log(text);
        setMarkdownContent(text);
      })
      .catch((err) => console.error(err));
  }, [path]);

  return (
    <Card>
      <ReactMarkdown>{markdownContent}</ReactMarkdown>;
    </Card>
  );
};
