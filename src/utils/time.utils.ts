export function getMinutesBetween(
  dateString1: string,
  dateString2: string
): number {
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);

  // Calculate the difference in milliseconds
  const diffInMs = Math.abs(date1.getTime() - date2.getTime());

  // Convert milliseconds to minutes
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

  return diffInMinutes;
}
