import "dotenv/config";
import twilio from "twilio";

const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

export const sendSMS = (to, message) =>
  client.messages.create({
    from: process.env.PHONE_NUMBER,
    to: to || process.env.TEST_PHONE_NUMBER,
    body: message,
  });

	export default sendSMS;