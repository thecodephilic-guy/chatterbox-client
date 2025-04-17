export const timeAgo = (timestamp) => {
  const now = new Date();
  const updatedAt = new Date(timestamp);
  const diffInMs = now - updatedAt; // Difference in milliseconds

  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  const formatTime = (date) => {
    return date
      .toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })
      .replace('am', 'AM')
      .replace('pm', 'PM');
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], { month: '2-digit', day: '2-digit', year: 'numeric' });
  };

  const formatDay = (date) => {
    return date.toLocaleDateString([], { weekday: 'long' });
  };

  if (diffInDays > 7) {
    return formatDate(updatedAt); // More than 1 week old
  } else if (diffInDays > 1) {
    return formatDay(updatedAt); // Show day like Monday, Tuesday
  } else if (diffInDays === 1) {
    return "Yesterday"; // If it was yesterday
  } else if (diffInHours > 0) {
    return `${formatTime(updatedAt)}`; // If it was today
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes} minutes ago`; // If it was a few minutes ago
  } else {
    return `Just now`; // If it was just now
  }
};
  
  