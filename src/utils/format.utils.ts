export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (!hours)
    return `${remainingMinutes} min${remainingMinutes > 1 ? "s" : ""}`;
  if (!remainingMinutes) return `${hours} hr${hours > 1 ? "s" : ""}`;

  return `${hours} hr${hours > 1 ? "s" : ""} ${remainingMinutes} min${
    remainingMinutes > 1 ? "s" : ""
  }`;
};

export const formatTime = (dateString: string): string => {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price);
};
