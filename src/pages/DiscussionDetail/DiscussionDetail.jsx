import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MessageCircle,
  ThumbsUp,
  Reply,
  User,
  Clock,
  Tag as TagIcon,
  Eye,
} from "lucide-react";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import TagList from "../../components/TagList/TagList";
import styles from "./DiscussionDetail.module.css";

const DiscussionDetail = () => {
  const { discussionId } = useParams();
  const navigate = useNavigate();
  const [replyText, setReplyText] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);

  // Mock discussion data - in real app this would come from context/API
  const discussion = {
    id: discussionId,
    title: "Help with React useState hook",
    author: "Alice Johnson",
    content: `I'm having trouble understanding how to properly use the useState hook in React. Specifically, I'm confused about:

1. When to use functional updates vs direct state updates
2. How to handle complex state objects
3. Best practices for state initialization

I've tried reading the documentation but I'm still getting errors in my code. Can someone help me understand these concepts with examples?

Here's what I've tried so far:
\`\`\`javascript
const [count, setCount] = useState(0);
setCount(count + 1); // This works
setCount(prevCount => prevCount + 1); // This also works but when should I use this?
\`\`\`

Any guidance would be greatly appreciated!`,
    tags: ["React", "JavaScript", "Help"],
    replies: 5,
    views: 23,
    lastActivity: "2 hours ago",
    isResolved: false,
    createdAt: "2 days ago",
  };

  const replies = [
    {
      id: "1",
      author: "Bob Smith",
      content:
        "Great question! The functional update is particularly useful when you need to update state based on the previous state value. Here's when to use each approach...",
      timestamp: "1 day ago",
      likes: 3,
      isAccepted: false,
    },
    {
      id: "2",
      author: "Carol Davis",
      content:
        "I agree with Bob. The functional update pattern is essential when you have multiple state updates happening in quick succession, or when the new state depends on the current state.",
      timestamp: "1 day ago",
      likes: 2,
      isAccepted: false,
    },
    {
      id: "3",
      author: "David Wilson",
      content:
        "Here's a practical example that might help clarify the difference...",
      timestamp: "12 hours ago",
      likes: 5,
      isAccepted: true,
    },
    {
      id: "4",
      author: "Emma Brown",
      content:
        "For complex state objects, I recommend using the spread operator or a state management library like Redux for larger applications.",
      timestamp: "8 hours ago",
      likes: 1,
      isAccepted: false,
    },
    {
      id: "5",
      author: "Frank Miller",
      content:
        "The React docs have a great section on this. The key is to use functional updates when the new state depends on the previous state.",
      timestamp: "2 hours ago",
      likes: 2,
      isAccepted: false,
    },
  ];

  const handleSubmitReply = () => {
    if (!replyText.trim()) return;

    // In real app, this would submit to backend
    console.log("Submitting reply:", replyText);
    setReplyText("");
    setShowReplyForm(false);
  };

  const handleLikeReply = (replyId) => {
    // In real app, this would update like count
    console.log("Liked reply:", replyId);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <Button
          variant="ghost"
          size="sm"
          icon={<ArrowLeft size={20} />}
          onClick={() => navigate("/discussion")}
          className={styles.backButton}
        >
          Back to Discussions
        </Button>
      </div>

      <div className={styles.content}>
        {/* Main Discussion */}
        <div className={styles.main}>
          <Card className={styles.discussionCard}>
            <div className={styles.discussionHeader}>
              <div className={styles.discussionMeta}>
                <div className={styles.authorInfo}>
                  <User size={16} />
                  <span>by {discussion.author}</span>
                </div>
                <div className={styles.timestamp}>
                  <Clock size={16} />
                  <span>{discussion.createdAt}</span>
                </div>
              </div>

              <h1 className={styles.discussionTitle}>{discussion.title}</h1>

              <TagList
                tags={discussion.tags}
                size="medium"
                className={styles.discussionTags}
              />
            </div>

            <div className={styles.discussionContent}>
              <div className={styles.contentText}>
                {discussion.content.split("\n").map((paragraph, index) => {
                  if (paragraph.startsWith("```")) {
                    return (
                      <pre key={index} className={styles.codeBlock}>
                        <code>{paragraph.replace(/```/g, "")}</code>
                      </pre>
                    );
                  }
                  return (
                    <p key={index} className={styles.paragraph}>
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </div>

            <div className={styles.discussionActions}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowReplyForm(!showReplyForm)}
                icon={<Reply size={16} />}
              >
                Reply
              </Button>
            </div>
          </Card>

          {/* Reply Form */}
          {showReplyForm && (
            <Card className={styles.replyFormCard}>
              <h3>Add a Reply</h3>
              <div className={styles.replyForm}>
                <textarea
                  placeholder="Share your thoughts or provide help..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className={styles.replyTextarea}
                  rows={4}
                />
                <div className={styles.replyActions}>
                  <Button
                    variant="ghost"
                    onClick={() => setShowReplyForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleSubmitReply}
                    disabled={!replyText.trim()}
                  >
                    Post Reply
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Replies */}
          <div className={styles.repliesSection}>
            <h3 className={styles.repliesTitle}>
              {replies.length} {replies.length === 1 ? "Reply" : "Replies"}
            </h3>

            <div className={styles.repliesList}>
              {replies.map((reply) => (
                <Card
                  key={reply.id}
                  className={`${styles.replyCard} ${
                    reply.isAccepted ? styles.acceptedReply : ""
                  }`}
                >
                  <div className={styles.replyHeader}>
                    <div className={styles.replyAuthor}>
                      <User size={16} />
                      <span>{reply.author}</span>
                      {reply.isAccepted && (
                        <span className={styles.acceptedBadge}>
                          Accepted Answer
                        </span>
                      )}
                    </div>
                    <div className={styles.replyTimestamp}>
                      <Clock size={14} />
                      <span>{reply.timestamp}</span>
                    </div>
                  </div>

                  <div className={styles.replyContent}>
                    <p>{reply.content}</p>
                  </div>

                  <div className={styles.replyActions}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLikeReply(reply.id)}
                      icon={<ThumbsUp size={14} />}
                    >
                      {reply.likes} {reply.likes === 1 ? "like" : "likes"}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className={styles.sidebar}>
          <Card className={styles.statsCard}>
            <h3>Discussion Stats</h3>
            <div className={styles.statsList}>
              <div className={styles.statItem}>
                <MessageCircle size={16} />
                <span>{discussion.replies} replies</span>
              </div>
              <div className={styles.statItem}>
                <Eye size={16} />
                <span>{discussion.views} views</span>
              </div>
              <div className={styles.statItem}>
                <Clock size={16} />
                <span>Last active {discussion.lastActivity}</span>
              </div>
            </div>
          </Card>

          <Card className={styles.guidelinesCard}>
            <h3>Community Guidelines</h3>
            <ul className={styles.guidelines}>
              <li>Be respectful and constructive</li>
              <li>Provide helpful, detailed answers</li>
              <li>Use code examples when relevant</li>
              <li>Accept helpful answers</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DiscussionDetail;
