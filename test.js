import "dotenv/config";
import db from "./src/db.js";
import { random } from "./src/fact.js";
import goatify from "./src/goatify.js";

const phoneNumber = process.env.TEST_PHONE_NUMBER;
const endOfMessage = ` < To cancel daily goat facts, reply with 'cancel' >`

try {
  let  i = 0;
  while (i++ < 20) {
    const fact = await random(phoneNumber);
    const message = goatify(fact.fact + endOfMessage);
    console.debug(message);
  }
} catch (err) {
  console.error(err);
} finally {
  db().end();
}
