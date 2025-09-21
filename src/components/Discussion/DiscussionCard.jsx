import React from "react";
import { MessageCircle } from "lucide-react";
import Card from "../Card/Card";
import TagList from "../TagList/TagList";
import styles from "./DiscussionCard.module.css";

const DiscussionCard = ({
  discussion,
  onDiscussionClick,
  onTagClick,
  selectedTag,
}) => {
  return (
    <Card
      className={styles.discussionCard}
      clickable
      onClick={() => onDiscussionClick(discussion.id)}
    >
      <div className={styles.discussionContent}>
        <div className={styles.discussionHeader}>
          <h3 className={styles.discussionTitle}>{discussion.title}</h3>
          {discussion.isResolved && (
            <span className={styles.resolvedBadge}>Resolved</span>
          )}
        </div>

        <div className={styles.discussionMeta}>
          <span className={styles.author}>by {discussion.author}</span>
          <span className={styles.lastActivity}>{discussion.lastActivity}</span>
        </div>

        <TagList
          tags={discussion.tags}
          onTagClick={onTagClick}
          selectedTag={selectedTag}
          clickable={true}
          size="medium"
          className={styles.discussionTags}
        />

        <div className={styles.discussionStats}>
          <div className={styles.stat}>
            <MessageCircle size={16} />
            <span>{discussion.replies} replies</span>
          </div>
          <div className={styles.stat}>
            <span>{discussion.views} views</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DiscussionCard;
