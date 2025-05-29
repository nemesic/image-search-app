import React from "react";
import styles from "./SearchBar.module.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<Props> = ({ value, onChange }) => (
  <div className={styles.wrapper}>
    <input
      className={styles.input}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Image search…"
      aria-label="Image search"
    />
    <span className={styles.icon} aria-hidden="true">
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="11" cy="11" r="7" />
        <line x1="16.65" y1="16.65" x2="21" y2="21" />
      </svg>
    </span>
  </div>
);
