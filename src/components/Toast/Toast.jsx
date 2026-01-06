import { useEffect, useState } from "react";
import styles from "./Toast.module.css";

function Toast({ children, duration = 3000, onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    const removeTimer = setTimeout(() => {
      onComplete?.();
    }, duration + 300); // duration + animation time

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, [duration, onComplete]);

  return (
    <div
      className={`${styles.toast} ${isVisible ? styles.show : styles.hide}`}
      role="alert"
      aria-live="assertive"
    >
      {children}
    </div>
  );
}

export default Toast;
