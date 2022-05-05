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
      res.json({ success: true, msg: 'Prescription post was created successfully' });
      return;
    }
    throw new Error('something went wrong posting prescription');
  } catch (error) {
    console.log('error in posting prescription ===', error);
    res.status(500).json({ err: 'something is wrong' });
  } finally {
    await conn?.end();
  }
});

prescriptionsRoutes.get('/prescriptions/:id', async (req, res) => {
  let conn;
  try {
    const { id } = req.params;
    conn = await mysql.createConnection(dbConfig);
    // eslint-disable-next-line operator-linebreak
    const sql =
      'SELECT medications.name AS medication_name, pets.name, medications.description, pets.dob, pets.client_email, pets.archived, prescriptions.id, medications.id AS med_id, pets.id AS pets_id, prescriptions.timestamp, prescriptions.comment FROM prescriptions INNER JOIN medications ON prescriptions.medication_id = medications.id INNER JOIN pets ON prescriptions.pet_id = pets.id WHERE pets.id = ?';
    const [result] = await conn.query(sql, [id]);
    res.json(result);
  } catch (error) {
    console.log('error in getting prescriptions===', error);
    res.status(500).json({ err: 'something is wrong' });
  } finally {
    await conn?.end();
  }
});

module.exports = prescriptionsRoutes;
