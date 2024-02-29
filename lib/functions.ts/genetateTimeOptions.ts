export const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const hourFormatted = hour.toString().padStart(2, '0');
        const minuteFormatted = minute.toString().padStart(2, '0');
        options.push(`${hourFormatted}:${minuteFormatted}`);
      }
    }
    return options;
  };
  

  