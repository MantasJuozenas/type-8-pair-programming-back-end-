const express = require('express');
const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

const prescriptionsRoutes = express.Router();

prescriptionsRoutes.post('/prescriptions', async (req, res) => {
  let conn;
  try {
    const { medication_id, pet_id, comment } = req.body;
    if (medication_id === '' || pet_id === '' || comment === '') {
      res.json({ err: 'blogai ivesti duomenys' });
      return;
    }
    conn = await mysql.createConnection(dbConfig);
    const sql = 'INSERT INTO prescriptions (medication_id, pet_id, comment) VALUES (?, ?, ?)';
    const [result] = await conn.execute(sql, [medication_id, pet_id, comment]);
    if (result.affectedRows === 1) {
      res.json({ success: 'prescription post successfully created' });
    }
    throw new Error('something went wrong posting prescription');
  } catch (error) {
    console.log('error in posting prescription ===', error);
    res.status(500).json({ err: 'something is wrong' });
  } finally {
    await conn?.end();
  }
});

module.exports = prescriptionsRoutes;
