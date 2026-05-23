export const emoji = "🐐";

const goatsRegex = /(goats)/gi;
const goatRegex = /(goat)/gi;
const goatsOptRegex = /(GOATS?)/gi;

// add goat emoji to the end of the "goat" word and uppercase the goat word
export const goatify = (str) => {
  const uppercased = str
    .replace(goatsRegex, `GOATS`)
    .replace(goatRegex, `GOAT`);
  const goatified = uppercased.replace(goatsOptRegex, `$1${emoji}`);
  return goatified;
};

export default goatify;
