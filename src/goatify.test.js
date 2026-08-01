import test from "node:test";
import assert from "node:assert";
import { goatify, emoji } from "./goatify.js";

test("goatify replaces 'goat' with uppercase and emoji", () => {
  assert.strictEqual(goatify("I have a goat."), `I have a GOAT${emoji}.`);
});

test("goatify replaces 'goats' with uppercase and emoji", () => {
  assert.strictEqual(goatify("I have many goats."), `I have many GOATS${emoji}.`);
});

test("goatify is case-insensitive", () => {
  assert.strictEqual(goatify("GoAt and gOATs"), `GOAT${emoji} and GOATS${emoji}`);
});

test("goatify leaves non-goat strings alone", () => {
  assert.strictEqual(goatify("I have a sheep."), "I have a sheep.");
});

test("goatify handles multiple occurrences", () => {
  assert.strictEqual(goatify("goat goat goats"), `GOAT${emoji} GOAT${emoji} GOATS${emoji}`);
});

test("goatify handles existing emojis correctly", () => {
  assert.strictEqual(goatify(`goat${emoji}`), `GOAT${emoji}${emoji}`);
});
