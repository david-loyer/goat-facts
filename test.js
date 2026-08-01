import "dotenv/config";
import db from "./src/db.js";
import { randomMany } from "./src/fact.js";
import goatify from "./src/goatify.js";

const phoneNumber = process.env.TEST_PHONE_NUMBER;
const endOfMessage = ` < To cancel daily goat facts, reply with 'cancel' >`

try {
  const facts = await randomMany(phoneNumber, 20);
  for (const fact of facts) {
    const message = goatify(fact.fact + endOfMessage);
    console.debug(message);
  }
} catch (err) {
  console.error(err);
} finally {
  db().end();
}
