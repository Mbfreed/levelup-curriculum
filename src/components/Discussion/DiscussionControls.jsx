import React from "react";
import { Plus, Search } from "lucide-react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import styles from "./DiscussionControls.module.css";

const DiscussionControls = ({
  searchTerm,
  onSearchChange,
  onNewDiscussion,
}) => {
  return (
    <div className={styles.controls}>
      <div className={styles.searchSection}>
        <Input
          placeholder="Search discussions..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          icon={<Search size={20} />}
          className={styles.searchInput}
        />
      </div>
      <Button
        variant="primary"
        icon={<Plus size={20} />}
        onClick={onNewDiscussion}
      >
        New Discussion
      </Button>
    </div>
  );
};

export default DiscussionControls;
