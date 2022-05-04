const express = require('express');
const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

const logsRoutes = express.Router();

logsRoutes.post('/logs', async (req, res) => {
  let conn;
  try {
    const { pets_id, description, status } = req.body;
    if (pets_id === '' || description === '' || status === '') {
      res.json({ err: 'blogai ivesti duomenys' });
      return;
    }
    conn = await mysql.createConnection(dbConfig);
    const sql = 'INSERT INTO logs (pets_id, description, status) VALUES (?, ?, ?)';
    const [result] = await conn.execute(sql, [pets_id, description, status]);
    if (result.affectedRows === 1) {
      res.json({ success: 'logs post successfully created' });
    }
    throw new Error('something went wrong posting logs');
  } catch (error) {
    console.log('error in posting logs ===', error);
    res.status(500).json({ err: 'something is wrong' });
  } finally {
    await conn?.end();
  }
});

logsRoutes.get('/logs', async (req, res) => {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM logs INNER JOIN pets ON logs.pets_id=pets.id;';
    const [result] = await conn.query(sql);
    res.json(result);
  } catch (error) {
    console.log('error in getting logs ===', error);
    res.status(500).json({ err: 'something is wrong' });
  } finally {
    await conn?.end();
  }
});

module.exports = logsRoutes;
