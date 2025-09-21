import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DiscussionControls from "../../components/Discussion/DiscussionControls";
import DiscussionCard from "../../components/Discussion/DiscussionCard";
import DiscussionSidebar from "../../components/Discussion/DiscussionSidebar";
import NewDiscussionModal from "../../components/Discussion/NewDiscussionModal";
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
          <DiscussionControls
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onNewDiscussion={handleNewDiscussion}
          />

          <div className={styles.discussionsList}>
            {filteredDiscussions.map((discussion) => (
              <DiscussionCard
                key={discussion.id}
                discussion={discussion}
                onDiscussionClick={handleDiscussionClick}
                onTagClick={handleTagClick}
                selectedTag={selectedTag}
              />
            ))}
          </div>
        </div>

        <DiscussionSidebar
          categories={categories}
          onCategoryClick={handleCategoryClick}
        />
      </div>

      <NewDiscussionModal
        isOpen={showNewDiscussion}
        onClose={() => setShowNewDiscussion(false)}
        onSubmit={handleCreateDiscussion}
        title={newDiscussionTitle}
        content={newDiscussionContent}
        tags={newDiscussionTags}
        tagInput={newDiscussionTagInput}
        onTitleChange={setNewDiscussionTitle}
        onContentChange={setNewDiscussionContent}
        onTagInputChange={setNewDiscussionTagInput}
        onAddTag={handleAddTag}
        onRemoveTag={handleRemoveTag}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default Discussion;
