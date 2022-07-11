const truncateStr = (str, max) => {
  if (!str) return;
  const l = str.length;
  return l > max ? str.slice(0, max) + '...' : str;
};

export default truncateStr;
