export function concatDateTime(date: Date, time: string) {
    const [hours, minutes] = time.split(':');    

    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));

    const formattedDateTime = date.toISOString();

    return formattedDateTime;
}