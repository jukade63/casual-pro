import { format, differenceInDays, differenceInHours } from 'date-fns';

export function formatDateTimeRange(startDate: Date | string, endDate: Date | string) {
  try {
    const startDateObj = typeof startDate === 'string' ? new Date(startDate) : startDate;
    const endDateObj = typeof endDate === 'string' ? new Date(endDate) : endDate;

    if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
      throw new Error('Invalid date value');
    }

    const days: number = differenceInDays(endDateObj, startDateObj);
    const hours: number = differenceInHours(endDateObj, startDateObj) % 24;

    let durationString: string = '';
    if (days > 0) {
      durationString += `${days}d`;
    }
    if (hours > 0) {
      durationString += (durationString ? ', ' : '') + `${hours} hours`;
    }

    const formattedStartDate: string = format(startDateObj, 'dd MMM yy');
    const formattedEndDate: string = format(endDateObj, 'dd MMM yy');

    return [formattedStartDate, formattedEndDate, durationString.trim()];
  } catch (error) {
    console.error('Error formatting date range:', error);
    return 'Invalid date range';
  }
}
