import { format, differenceInDays, differenceInHours } from 'date-fns';

export function formatDateTimeRange(startDate: string, endDate: string): string {
  const days: number = differenceInDays(endDate, startDate);
  const hours: number = differenceInHours(endDate, startDate) % 24;

  let durationString: string = '';
  if (days > 0) {
    durationString += `${days}d`;
  }
  if (hours > 0) {
    durationString += (durationString ? ', ' : '') + `${hours} hours`;
  }

  const formattedStartDate: string = format(startDate, 'dd MMM yy');
  const formattedEndDate: string = format(endDate, 'dd MMM yy');

  return `${formattedStartDate} - ${formattedEndDate} (${durationString})`;
}
