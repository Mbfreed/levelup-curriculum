import React from "react";
import styles from "./Input.module.css";

const Input = ({
  label,
  error,
  helperText,
  helpText, // Accept both spellings for compatibility
  icon,
  iconPosition = "left",
  size = "md",
  variant = "default",
  className = "",
  ...props
}) => {
  // Use helperText if provided, otherwise fall back to helpText
  const finalHelperText = helperText || helpText;

  const inputClasses = [
    styles.input,
    styles[size],
    styles[variant],
    error && styles.error,
    icon && styles[`icon-${iconPosition}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputWrapper}>
        {icon && iconPosition === "left" && (
          <span className={styles.iconLeft}>{icon}</span>
        )}
        <input className={inputClasses} {...props} />
        {icon && iconPosition === "right" && (
          <span className={styles.iconRight}>{icon}</span>
        )}
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
      {finalHelperText && !error && (
        <span className={styles.helperText}>{finalHelperText}</span>
      )}
    </div>
  );
};

export default Input;
