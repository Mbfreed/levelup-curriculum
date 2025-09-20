import React from "react";
import styles from "./TagList.module.css";

const TagList = ({
  tags,
  onTagClick = null,
  selectedTag = null,
  clickable = false,
  size = "medium",
  className = "",
}) => {
  const handleTagClick = (tag, event) => {
    if (onTagClick && clickable) {
      event.stopPropagation();
      onTagClick(tag);
    }
  };

  return (
    <div className={`${styles.tagList} ${className}`}>
      {tags.map((tag) => (
        <span
          key={tag}
          className={`${styles.tag} ${styles[size]} ${
            clickable ? styles.clickable : ""
          } ${selectedTag === tag ? styles.selected : ""}`}
          onClick={(e) => handleTagClick(tag, e)}
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default TagList;
