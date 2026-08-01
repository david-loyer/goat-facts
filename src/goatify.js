export const emoji = "🐐";

// add goat emoji to the end of the "goat" word and uppercase the goat word
export const goatify = (str) => {
  return str.replace(/(goats?)/gi, (match) => `${match.toUpperCase()}${emoji}`);
};

export default goatify;
