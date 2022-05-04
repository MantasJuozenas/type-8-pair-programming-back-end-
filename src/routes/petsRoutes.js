const express = require('express');
const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

const petsRoutes = express.Router();

petsRoutes.get('/pets', async (req, res) => {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM pets WHERE archived = 0';
    const [result] = await conn.query(sql);
    res.json(result);
  } catch (error) {
    console.log('error in getting pets===', error);
    res.status(500).json({ err: 'something is wrong' });
  } finally {
    await conn?.end();
  }
});
petsRoutes.get('/pets/:petId', async (req, res) => {
  let conn;
  try {
    const { petId } = req.params;
    conn = await mysql.createConnection(dbConfig);
    const sql = `SELECT * FROM pets WHERE id = ${petId} AND archived = 0`;
    const [result] = await conn.execute(sql);
    res.json(result);
  } catch (error) {
    console.log('error in getting pets by id===', error);
    res.status(500).json({ err: 'something is wrong' });
  } finally {
    await conn?.end();
  }
});

petsRoutes.post('/pets', async (req, res) => {
  let conn;
  try {
    const { name, dob, client_email } = req.body;
    if (name === '' || dob === '' || client_email === '') {
      res.json({ err: 'blogai ivesti duomenys' });
      return;
    }
    conn = await mysql.createConnection(dbConfig);
    const sql = 'INSERT INTO pets (name, dob, client_email) VALUES (?, ?, ?)';
    const [result] = await conn.execute(sql, [name, dob, client_email]);
    if (result.affectedRows === 1) {
      res.json({ success: 'pets post successfully created' });
    }
    throw new Error('something went wrong posting pets');
  } catch (error) {
    console.log('error in getting pets===', error);
    res.status(500).json({ err: 'something is wrong' });
  } finally {
    await conn?.end();
  }
});

petsRoutes.delete('/pets/:petsId', async (req, res) => {
  let conn;
  try {
    const { petsId } = req.params;

    conn = await mysql.createConnection(dbConfig);
    const sql = 'UPDATE pets SET archived = 1 WHERE id = ?';
    const [result] = await conn.execute(sql, [petsId]);
    if (result.affectedRows !== 1) {
      res
        .status(400)
        .json({ success: false, error: `user with id ${petsId} was not found` });
      return;
    }

    if (result.affectedRows === 1) {
      res.json({ success: true, msg: 'delete ok' });
      return;
    }
    throw new Error('something wrong in deleting pets');
  } catch (error) {
    console.log('error in getting pets===', error);
    res.status(500).json({ err: 'something is wrong' });
  } finally {
    await conn?.end();
  }
});

module.exports = petsRoutes;
