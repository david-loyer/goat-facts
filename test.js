import "dotenv/config";
import db from "./src/db.js";
import { random } from "./src/fact.js";
import goatify from "./src/goatify.js";

const phoneNumber = process.env.TEST_PHONE_NUMBER;
const endOfMessage = ` < To cancel daily goat facts, reply with 'cancel' >`

try {
  const promises = [];
  for (let i = 0; i < 20; i++) {
    promises.push(
      random(phoneNumber).then(fact => {
        const message = goatify(fact.fact + endOfMessage);
        console.debug(message);
      })
    );
  }
  await Promise.all(promises);
} catch (err) {
  console.error(err);
} finally {
  db().end();
}
