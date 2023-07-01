export const textTruncate = (
  str: string,
  length = 100,
  ending = '...',
): string => {
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  }
  return str;
};
