export const maskEmail = (email) => {
  const [localPart, domainPart] = email.split("@");
  if (!localPart || localPart.length < 2) return email;
  const maskedLocalPart = localPart[0] + "*".repeat(localPart.length - 1);
  return `${maskedLocalPart}@${domainPart}`;
};

export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};
