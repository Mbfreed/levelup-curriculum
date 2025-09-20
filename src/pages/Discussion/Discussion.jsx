import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Plus, Search, Filter, X } from "lucide-react";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import TagList from "../../components/TagList/TagList";
import Modal from "../../components/Modal/Modal";
import styles from "./Discussion.module.css";

const Discussion = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState(null);
  const [showNewDiscussion, setShowNewDiscussion] = useState(false);
  const [newDiscussionTitle, setNewDiscussionTitle] = useState("");
  const [newDiscussionContent, setNewDiscussionContent] = useState("");
  const [newDiscussionTags, setNewDiscussionTags] = useState([]);
  const [newDiscussionTagInput, setNewDiscussionTagInput] = useState("");
  const navigate = useNavigate();

  const [discussions, setDiscussions] = useState([
    {
      id: "1",
      title: "Help with React useState hook",
      author: "Alice Johnson",
      replies: 5,
      views: 23,
      lastActivity: "2 hours ago",
      tags: ["React", "JavaScript", "Help"],
      isResolved: false,
      category: "Help",
    },
    {
      id: "2",
      title: "Best practices for CSS Grid layouts",
      author: "Bob Smith",
      replies: 12,
      views: 45,
      lastActivity: "1 day ago",
      tags: ["CSS", "Layout", "Best Practices"],
      isResolved: true,
      category: "Best Practices",
    },
    {
      id: "3",
      title: "JavaScript async/await confusion",
      author: "Carol Davis",
      replies: 8,
      views: 31,
      lastActivity: "3 days ago",
      tags: ["JavaScript", "Async", "Help"],
      isResolved: false,
      category: "Help",
    },
    {
      id: "4",
      title: "Showcase: My Portfolio Website",
      author: "David Wilson",
      replies: 15,
      views: 67,
      lastActivity: "4 hours ago",
      tags: ["Showcase", "Portfolio", "React"],
      isResolved: false,
      category: "Showcase",
    },
    {
      id: "5",
      title: "Node.js Express server setup tips",
      author: "Emma Brown",
      replies: 3,
      views: 18,
      lastActivity: "6 hours ago",
      tags: ["Node.js", "Express", "Backend"],
      isResolved: false,
      category: "Best Practices",
    },
  ]);

  // Filter discussions based on search, category, and tags
  const filteredDiscussions = useMemo(() => {
    return discussions.filter((discussion) => {
      const matchesSearch =
        discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        discussion.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        discussion.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "All" || discussion.category === selectedCategory;

      const matchesTag =
        selectedTag === null || discussion.tags.includes(selectedTag);

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [discussions, searchTerm, selectedCategory, selectedTag]);

  // Update category counts dynamically
  const categories = useMemo(() => {
    const categoryCounts = discussions.reduce((acc, discussion) => {
      acc[discussion.category] = (acc[discussion.category] || 0) + 1;
      return acc;
    }, {});

    return [
      {
        name: "All",
        count: discussions.length,
        active: selectedCategory === "All",
      },
      {
        name: "Help",
        count: categoryCounts["Help"] || 0,
        active: selectedCategory === "Help",
      },
      {
        name: "Best Practices",
        count: categoryCounts["Best Practices"] || 0,
        active: selectedCategory === "Best Practices",
      },
      {
        name: "Showcase",
        count: categoryCounts["Showcase"] || 0,
        active: selectedCategory === "Showcase",
      },
    ];
  }, [discussions, selectedCategory]);

  // Helper functions
  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setSelectedTag(null); // Reset tag filter when changing category
  };

  const handleTagClick = (tag) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  const handleDiscussionClick = (discussionId) => {
    navigate(`/discussion/${discussionId}`);
  };

  const handleNewDiscussion = () => {
    setShowNewDiscussion(true);
  };

  const handleCreateDiscussion = () => {
    if (!newDiscussionTitle.trim() || !newDiscussionContent.trim()) return;

    const newDiscussion = {
      id: Date.now().toString(),
      title: newDiscussionTitle,
      author: "Current User",
      replies: 0,
      views: 0,
      lastActivity: "just now",
      tags: newDiscussionTags,
      isResolved: false,
      category: "Help", // Default category
    };

    setDiscussions((prev) => [newDiscussion, ...prev]);
    setNewDiscussionTitle("");
    setNewDiscussionContent("");
    setNewDiscussionTags([]);
    setNewDiscussionTagInput("");
    setShowNewDiscussion(false);
  };

  const handleAddTag = () => {
    if (
      newDiscussionTagInput.trim() &&
      !newDiscussionTags.includes(newDiscussionTagInput.trim())
    ) {
      setNewDiscussionTags((prev) => [...prev, newDiscussionTagInput.trim()]);
      setNewDiscussionTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setNewDiscussionTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTag();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Community Discussion</h1>
        <p className={styles.subtitle}>
          Ask questions, share knowledge, and help your peers
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.main}>
          <div className={styles.controls}>
            <div className={styles.searchSection}>
              <Input
                placeholder="Search discussions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search size={20} />}
                className={styles.searchInput}
              />
            </div>
            <Button
              variant="primary"
              icon={<Plus size={20} />}
              onClick={handleNewDiscussion}
            >
              New Discussion
            </Button>
          </div>

          <div className={styles.discussionsList}>
            {filteredDiscussions.map((discussion) => (
              <Card
                key={discussion.id}
                className={styles.discussionCard}
                clickable
                onClick={() => handleDiscussionClick(discussion.id)}
              >
                <div className={styles.discussionContent}>
                  <div className={styles.discussionHeader}>
                    <h3 className={styles.discussionTitle}>
                      {discussion.title}
                    </h3>
                    {discussion.isResolved && (
                      <span className={styles.resolvedBadge}>Resolved</span>
                    )}
                  </div>

                  <div className={styles.discussionMeta}>
                    <span className={styles.author}>
                      by {discussion.author}
                    </span>
                    <span className={styles.lastActivity}>
                      {discussion.lastActivity}
                    </span>
                  </div>

                  <TagList
                    tags={discussion.tags}
                    onTagClick={handleTagClick}
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
            ))}
          </div>
        </div>

        <div className={styles.sidebar}>
          <Card className={styles.categoriesCard}>
            <h3>Categories</h3>
            <div className={styles.categoriesList}>
              {categories.map((category) => (
                <button
                  key={category.name}
                  className={`${styles.categoryItem} ${
                    category.active ? styles.active : ""
                  }`}
                  onClick={() => handleCategoryClick(category.name)}
                >
                  <span className={styles.categoryName}>{category.name}</span>
                  <span className={styles.categoryCount}>{category.count}</span>
                </button>
              ))}
            </div>
          </Card>

          <Card className={styles.guidelinesCard}>
            <h3>Community Guidelines</h3>
            <ul className={styles.guidelines}>
              <li>Be respectful and constructive</li>
              <li>Search before asking</li>
              <li>Provide clear, detailed questions</li>
              <li>Help others when you can</li>
              <li>Use appropriate tags</li>
            </ul>
          </Card>
        </div>
      </div>

      {/* New Discussion Modal */}
      <Modal
        isOpen={showNewDiscussion}
        onClose={() => setShowNewDiscussion(false)}
        title="Create New Discussion"
        size="medium"
        actions={
          <>
            <Button variant="ghost" onClick={() => setShowNewDiscussion(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleCreateDiscussion}
              disabled={
                !newDiscussionTitle.trim() || !newDiscussionContent.trim()
              }
            >
              Create Discussion
            </Button>
          </>
        }
      >
        <Input
          label="Discussion Title"
          placeholder="Enter a clear, descriptive title..."
          value={newDiscussionTitle}
          onChange={(e) => setNewDiscussionTitle(e.target.value)}
        />

        <div className={styles.modalField}>
          <label className={styles.modalLabel}>Description</label>
          <textarea
            placeholder="Describe your question or topic in detail..."
            value={newDiscussionContent}
            onChange={(e) => setNewDiscussionContent(e.target.value)}
            className={styles.modalTextarea}
            rows={6}
          />
        </div>

        <div className={styles.modalField}>
          <label className={styles.modalLabel}>Tags</label>
          <div className={styles.tagInputContainer}>
            <Input
              placeholder="Add a tag..."
              value={newDiscussionTagInput}
              onChange={(e) => setNewDiscussionTagInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className={styles.tagInput}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddTag}
              disabled={!newDiscussionTagInput.trim()}
            >
              Add
            </Button>
          </div>

          {newDiscussionTags.length > 0 && (
            <div className={styles.tagsList}>
              {newDiscussionTags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className={styles.removeTag}
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Discussion;
