export const capitalizeFirstLetter = (s = ' '): string => {
  return s[0]?.toUpperCase() + s.slice(1) || '';
};
