import { useState } from "react";

export const useDescriptionToggle = (description = "") => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isLongDescription = description.split(" ").length > 60;

  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  const displayText =
    isExpanded || !isLongDescription
      ? description
      : description.split(" ").slice(0, 60).join(" ") + "...";

  return { isExpanded, isLongDescription, toggleExpanded, displayText };
};
