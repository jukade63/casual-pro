import { format, differenceInDays, differenceInHours, differenceInMonths, differenceInYears, addMonths, subMonths } from 'date-fns';

export function formatDateTimeRange(startDate: Date | string, endDate: Date | string) {
    const startDateObj = typeof startDate === 'string' ? new Date(startDate) : startDate;
    const endDateObj = typeof endDate === 'string' ? new Date(endDate) : endDate;

    if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
        throw new Error('Invalid date value');
    }

    const years: number = differenceInYears(endDateObj, startDateObj);
    const months: number = differenceInMonths(endDateObj, addMonths(startDateObj, years * 12));
    const days: number = differenceInDays(endDateObj, addMonths(startDateObj, years * 12 + months));
    const hours: number = differenceInHours(endDateObj, startDateObj) % 24;

    let durationString: string = '';
    if (years > 0) {
        durationString += `${years}y`;
    }
    if (months > 0) {
        durationString += (durationString ? ', ' : '') + `${months}m`;
    }
    if (days > 0) {
        durationString += (durationString ? ', ' : '') + `${days}d`;
    }
    if (hours > 0) {
        durationString += (durationString ? ', ' : '') + `${hours}h/d`;
    }

    const formattedStartDate: string = format(startDateObj, 'dd MMM yyyy');
    const formattedEndDate: string = format(endDateObj, 'dd MMM yyyy');

    if (durationString) {
        return `${formattedStartDate} - ${formattedEndDate} (${durationString})`;
    } else {
        return `${formattedStartDate} - ${formattedEndDate}`;
    }
}
