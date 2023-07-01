import "dotenv/config";
import db from "./src/db.js";
import { random, markSent } from "./src/fact.js";
import goatify from "./src/goatify.js";
import sendSMS from "./src/sendSMS.js";

const phoneNumber = process.env.TEST_PHONE_NUMBER;
const endOfMessage = ` < To cancel daily goat facts, reply with 'cancel' >`

try {
  const fact = await random(phoneNumber);
  const message = goatify(fact.fact + endOfMessage);
  console.debug(message);
  const sms = await sendSMS(false, message);
  console.debug(sms);
  await markSent(phoneNumber, fact.id)
} catch (err) {
  console.error(err);
} finally {
  db().end();
}
