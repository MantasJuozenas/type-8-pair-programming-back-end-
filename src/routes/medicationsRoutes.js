const express = require('express');
const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

const medicationsRoutes = express.Router();

medicationsRoutes.get('/medications', async (req, res) => {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM medications';
    const [result] = await conn.query(sql);
    res.json(result);
  } catch (error) {
    console.log('error in getting medications ===', error);
    res.status(500).json({ err: 'something is wrong' });
  } finally {
    await conn?.end();
  }
});

medicationsRoutes.post('/medications', async (req, res) => {
  let conn;
  try {
    const { name, description } = req.body;
    if (name === '' || description === '') {
      res.json({ err: 'blogai ivesti duomenys' });
      return;
    }
    conn = await mysql.createConnection(dbConfig);
    const sql = 'INSERT INTO medications (name, description) VALUES (?, ?)';
    const [result] = await conn.execute(sql, [name, description]);
    if (result.affectedRows === 1) {
      res.json({ success: true, msg: 'Medication post was created successfully' });
      return;
    }
    throw new Error('something went wrong posting medications');
  } catch (error) {
    console.log('error in posting medications ===', error);
    res.status(500).json({ err: 'something is wrong' });
  } finally {
    await conn?.end();
  }
});

module.exports = medicationsRoutes;
