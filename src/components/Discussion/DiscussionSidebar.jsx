import React from "react";
import Card from "../Card/Card";
import styles from "./DiscussionSidebar.module.css";

const DiscussionSidebar = ({ categories, onCategoryClick }) => {
  return (
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
              onClick={() => onCategoryClick(category.name)}
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
  );
};

export default DiscussionSidebar;
