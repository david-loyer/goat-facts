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

export const randomMany = async function (
  phone,
  limit = 20,
  funny = true,
  ai = false,
  force = false
) {
  if (force) {
    const [rows] = await db().query(
      `SELECT * FROM facts ORDER BY RAND() LIMIT ${limit}`
    );
    return rows;
  }

  const alreadySentIdsSql = `SELECT fact_id FROM sent_facts WHERE phone_id = (SELECT id FROM phones WHERE phone = :phone)`;

  let [rows] = await db().query(
    `SELECT * FROM facts WHERE id NOT IN (${alreadySentIdsSql}) AND funny = ${funny ? 1 : 0} AND ai = ${ai ? 1 : 0} ORDER BY RAND() LIMIT ${limit}`,
    { phone }
  );

  if (rows.length < limit) {
    const moreRows = await randomMany(phone, limit - rows.length, false, ai, !funny && !ai);
    rows = rows.concat(moreRows);
  }

  return rows;
};

export const markSent = async function (phone, factId) {
  const [rows] = await db().query(
    "INSERT INTO sent_facts (phone_id, fact_id) SELECT id, :factId FROM phones WHERE phone = :phone",
    { phone, factId }
  );
  return rows;
};

export default {
  random,
  randomMany,
  markSent,
};
