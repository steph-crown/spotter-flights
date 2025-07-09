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

export const formatPrice = (
  price: number,
  locale: string,
  currency: string
): string => {
  const amount = new Intl.NumberFormat(locale, {
    style: "decimal",
    currency: currency,
    minimumFractionDigits: 0,
    currencyDisplay: "code",
  }).format(price);

  return `${currency} ${amount}`;
};

export const formatFullDateTime = (isoString: string): string => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(date);
};

export const formatStopTooltip = (stop: {
  name: string;
  type?: string;
  country: string;
}): string => {
  const parts = [stop.name];
  if (stop.type) {
    parts.push(stop.type);
  }
  parts.push(stop.country);
  return parts.join(", ");
};

export const formatDateForAPI = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
