export const calculateReminderTimes = (frequency: string, startTime: string = "07:00"): string[] => {
  // Default to empty array if frequency is invalid
  if (!frequency || typeof frequency !== "string") {
    console.warn(`Invalid frequency: ${frequency}, defaulting to single reminder at ${startTime}`);
    return [startTime];
  }

  const normalizedFrequency = frequency.trim().toLowerCase();
  const [startHour] = startTime.split(":").map(Number);

  switch (normalizedFrequency) {
    case "once daily":
      return [startTime]; // e.g., ["07:00"]
    case "twice daily":
      return [startTime, `${(startHour + 12) % 24}:00`]; // e.g., ["07:00", "19:00"]
    case "thrice daily":
      return [startTime, `${(startHour + 6) % 24}:00`, `${(startHour + 12) % 24}:00`]; // e.g., ["07:00", "13:00", "19:00"]
    case "every 6 hours":
      return [
        startTime,
        `${(startHour + 6) % 24}:00`,
        `${(startHour + 12) % 24}:00`,
        `${(startHour + 18) % 24}:00`,
      ]; // e.g., ["07:00", "13:00", "19:00", "01:00"]
    default:
      console.warn(`Unsupported frequency: ${frequency}, defaulting to single reminder at ${startTime}`);
      return [startTime]; // Fallback to single reminder
  }
};