export const truncateDescriptionByChar = (description, charLimit) => {
  if (description.length <= charLimit) {
    return description;
  }
  return description.slice(0, charLimit) + "...";
};
