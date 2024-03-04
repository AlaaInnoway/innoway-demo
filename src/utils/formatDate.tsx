export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en-US', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  }).format(date);

export const stringToDate = (date: string | undefined): string => {
  return date ? new Date(date).toISOString().split('T')[0] : '';
};

export const retrieveYear = (
  date: Date,
  format: '2-digit' | 'numeric' | undefined = 'numeric'
) =>
  new Intl.DateTimeFormat('en-US', {
    year: format,
  }).format(date);

export const retrieveMonth = (
  date: Date,
  format: '2-digit' | 'numeric' | 'short' = '2-digit'
) =>
  new Intl.DateTimeFormat('en-US', {
    month: format,
  }).format(date);

export const retrieveDay = (
  date: Date,
  format: '2-digit' | 'numeric' | undefined = '2-digit'
) =>
  new Intl.DateTimeFormat('en-US', {
    day: format,
  }).format(date);

export const formattedTime = (
  date: Date
  ) =>
  new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);

export const calculateDuration = (
  startDate: string,
  endDate: string,
  holidays: Date[] = []
) => {
  if (!startDate || !endDate) {
    return 0;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  const currentDate = start;
  let adjustedDuration = 0;

  while (currentDate <= end) {
    // Check if the current date is not a weekend (Saturday or Sunday)
    if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
      // Check if the current date is not a holiday
      if (
        !holidays.some((holiday) => holiday.getTime() === currentDate.getTime())
      ) {
        // eslint-disable-next-line no-plusplus
        adjustedDuration++;
      }
    }

    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return adjustedDuration;
};
