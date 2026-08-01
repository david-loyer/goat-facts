import db from "./db.js";

export const random = async function (
  phone,
  funny = true,
  ai = false,
  force = false
) {
  if (force) {
    const [ids] = await db().query("SELECT id FROM facts");
    if (ids.length === 0) return null;
    const randomId = ids[Math.floor(Math.random() * ids.length)].id;
    const [rows] = await db().query("SELECT * FROM facts WHERE id = ?", [randomId]);
    return rows[0];
  }

  const alreadySentIdsSql = `SELECT fact_id FROM sent_facts WHERE phone_id = (SELECT id FROM phones WHERE phone = :phone)`;

  const [ids] = await db().query(
    `SELECT id FROM facts WHERE id NOT IN (${alreadySentIdsSql}) AND funny = ${funny ? 1 : 0} AND ai = ${ai ? 1 : 0}`,
    { phone }
  );

  if (ids.length === 0) {
    return random(phone, false, ai, !funny && !ai);
  }

  const randomId = ids[Math.floor(Math.random() * ids.length)].id;
  const [rows] = await db().query("SELECT * FROM facts WHERE id = ?", [randomId]);

  return rows[0];
};

export const markSent = async function (phone, factId) {
  const [phones] = await db().query(
    "SELECT id FROM phones WHERE phone = :phone",
    { phone }
  );
  const [rows] = await db().query(
    "INSERT INTO sent_facts (phone_id, fact_id) VALUES (:phoneId, :factId)",
    { phoneId: phones[0].id, factId }
  );
  return rows;
};

export default {
  random,
  markSent,
};
