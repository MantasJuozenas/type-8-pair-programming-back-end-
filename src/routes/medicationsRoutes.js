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

module.exports = medicationsRoutes;
