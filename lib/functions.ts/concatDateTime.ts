
export function concatDateTime(date: Date, time: string): string {
    const [hours, minutes] = time.split(':');

    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));

    //convert to local time zone
    const isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
    
    return isoDateTime
}
