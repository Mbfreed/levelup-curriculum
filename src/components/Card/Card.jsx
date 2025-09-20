import React from "react";
import styles from "./Card.module.css";

const Card = ({
  children,
  padding = "md",
  hover = false,
  clickable = false,
  className = "",
  onClick,
  ...props
}) => {
  const cardClasses = [
    styles.card,
    styles[padding],
    hover && styles.hover,
    clickable && styles.clickable,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={cardClasses}
      onClick={clickable ? onClick : undefined}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
