export const emoji = "🐐";

// add goat emoji to the end of the "goat" word and uppercase the goat word
export const goatify = (str) => {
  const uppercased = str
    .replace(/(goats)/gi, `GOATS`)
    .replace(/(goat)/gi, `GOAT`);
  const goatified = uppercased.replace(/(GOATS?)/gi, `$1${emoji}`);
  return goatified;
};

export default goatify;
