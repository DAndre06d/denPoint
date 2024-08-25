export const titleCase = (string) => {
    if (typeof string !== 'string') throw new Error("this function only accepts strings.")
    return string.split(' ') .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() ).join(' '); 
};
//formats the date with words example: August 17, 2024
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
}
//formats the date to 2024-08-17
export const formatDateForDB = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};