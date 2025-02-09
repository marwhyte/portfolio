export const formatDate = (defaultDate: string) => {
  // Split the date string and create date using local timezone
  const [year, month, day] = defaultDate.split('-').map(Number);
  const date = new Date(year, month - 1, day); // month is 0-based in JavaScript

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return date.toLocaleDateString('en-US', options);
};

export const formatViews = (number: number) => {
  const formattedNumber = number
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const viewsText = number === 1 ? ' view' : ' views';
  return formattedNumber + viewsText;
};
