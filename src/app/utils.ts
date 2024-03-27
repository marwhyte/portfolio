export const formatDate = (defaultDate: string) => {
  const date = new Date(defaultDate);
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
  const viewsText = number === 1 ? ' view' : ' views'; // Checks if the number is 1 to decide between 'view' and 'views'
  return formattedNumber + viewsText;
};
