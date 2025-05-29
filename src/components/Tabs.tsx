import { useState } from "react";

export const Tabs = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="tabs">
      {["Tab 1", "Tab 2", "Tab 3"].map((label, index) => (
        <button
          key={index}
          className={`tab-button ${index === activeIndex ? "active" : ""}`}
          onClick={() => setActiveIndex(index)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
