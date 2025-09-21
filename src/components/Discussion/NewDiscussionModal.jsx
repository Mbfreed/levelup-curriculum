import React from "react";
import { X } from "lucide-react";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import Input from "../Input/Input";
import styles from "./NewDiscussionModal.module.css";

const NewDiscussionModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  content,
  tags,
  tagInput,
  onTitleChange,
  onContentChange,
  onTagInputChange,
  onAddTag,
  onRemoveTag,
  onKeyPress,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Discussion"
      size="medium"
      actions={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={onSubmit}
            disabled={!title.trim() || !content.trim()}
          >
            Create Discussion
          </Button>
        </>
      }
    >
      <Input
        label="Discussion Title"
        placeholder="Enter a clear, descriptive title..."
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
      />

      <div className={styles.modalField}>
        <label className={styles.modalLabel}>Description</label>
        <textarea
          placeholder="Describe your question or topic in detail..."
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          className={styles.modalTextarea}
          rows={6}
        />
      </div>

      <div className={styles.modalField}>
        <label className={styles.modalLabel}>Tags</label>
        <div className={styles.tagInputContainer}>
          <Input
            placeholder="Add a tag..."
            value={tagInput}
            onChange={(e) => onTagInputChange(e.target.value)}
            onKeyPress={onKeyPress}
            className={styles.tagInput}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={onAddTag}
            disabled={!tagInput.trim()}
          >
            Add
          </Button>
        </div>

        {tags.length > 0 && (
          <div className={styles.tagsList}>
            {tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
                <button
                  onClick={() => onRemoveTag(tag)}
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
  );
};

export default NewDiscussionModal;
