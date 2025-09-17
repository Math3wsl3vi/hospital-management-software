export const calculateReminderTimes = (frequency: string, startTime: string): string[] => {
  const times: string[] = [];
  const [startHour] = startTime.split(':').map(Number);

  switch (frequency) {
    case '1x/day':
      times.push(startTime); // e.g., "07:00"
      break;
    case '2x/day':
      times.push(startTime); // e.g., "07:00"
      times.push(`${(startHour + 12) % 24}:00`); // e.g., "19:00"
      break;
    case '3x/day':
      times.push(startTime); // e.g., "07:00"
      times.push(`${(startHour + 7) % 24}:00`); // e.g., "14:00"
      times.push(`${(startHour + 12) % 24}:00`); // e.g., "19:00"
      break;
    case '4x/day':
      times.push(startTime); // e.g., "07:00"
      times.push(`${(startHour + 5) % 24}:00`); // e.g., "12:00"
      times.push(`${(startHour + 10) % 24}:00`); // e.g., "17:00"
      times.push(`${(startHour + 13) % 24}:00`); // e.g., "20:00"
      break;
    default:
      times.push(startTime);
  }

  return times.map((time) => time.padStart(5, '0')); // Ensure "7:00" format
};