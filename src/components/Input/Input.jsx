import React from "react";
import styles from "./Input.module.css";

const Input = ({
  label,
  error,
  helperText,
  icon,
  iconPosition = "left",
  size = "md",
  variant = "default",
  className = "",
  ...props
}) => {
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
      {helperText && !error && (
        <span className={styles.helperText}>{helperText}</span>
      )}
    </div>
  );
};

export default Input;
