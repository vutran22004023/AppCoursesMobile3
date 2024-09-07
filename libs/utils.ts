export const formatDate = (dataString: string) => {
  const date = new Date(dataString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export const timeStringToSeconds = (timeString: any) => {
  if (typeof timeString !== 'string') {
    console.error('Invalid timeString:', timeString);
    return 0;
  }
  const [minutes, seconds] = timeString.split(':').map(Number);
  return minutes * 60 + seconds;
};
