import styles from "./Button.module.css";

function Button({
  label,
  onClick,
  size = "large",
  disabled = false,
  variant = "primary",
}) {
  return (
    <div
      className={`${styles.buttonWrapper} 
        ${variant === "secondary" && styles.secondary}`}
    >
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${styles.button} 
          ${variant === "secondary" && styles.secondary}
          ${size === "small" && styles.small}`}
      >
        {label}
      </button>
    </div>
  );
}

export default Button;
