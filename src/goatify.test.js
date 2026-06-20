import test from "node:test";
import assert from "node:assert";
import goatify, { emoji } from "./goatify.js";

test("goatify function", async (t) => {
  await t.test("should uppercase 'goat' and add emoji", () => {
    assert.strictEqual(goatify("goat"), `GOAT${emoji}`);
  });

  await t.test("should uppercase 'goats' and add emoji", () => {
    assert.strictEqual(goatify("goats"), `GOATS${emoji}`);
  });

  await t.test("should handle uppercase 'GOAT'", () => {
    assert.strictEqual(goatify("GOAT"), `GOAT${emoji}`);
  });

  await t.test("should handle uppercase 'GOATS'", () => {
    assert.strictEqual(goatify("GOATS"), `GOATS${emoji}`);
  });

  await t.test("should handle mixed case 'gOaT'", () => {
    assert.strictEqual(goatify("gOaT"), `GOAT${emoji}`);
  });

  await t.test("should handle mixed case 'GoAtS'", () => {
    assert.strictEqual(goatify("GoAtS"), `GOATS${emoji}`);
  });

  await t.test("should replace multiple instances in a sentence", () => {
    assert.strictEqual(
      goatify("A goat and another goat."),
      `A GOAT${emoji} and another GOAT${emoji}.`
    );
  });

  await t.test("should replace both singular and plural in a sentence", () => {
    assert.strictEqual(
      goatify("One goat, two goats."),
      `One GOAT${emoji}, two GOATS${emoji}.`
    );
  });

  await t.test("should not modify strings without the word 'goat'", () => {
    assert.strictEqual(goatify("hello world"), "hello world");
    assert.strictEqual(goatify("sheep and cows"), "sheep and cows");
  });

  await t.test("should handle empty strings", () => {
    assert.strictEqual(goatify(""), "");
  });

  await t.test("should replace substrings containing 'goat'", () => {
    assert.strictEqual(goatify("scapegoat"), `scapeGOAT${emoji}`);
  });
});
