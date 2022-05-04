const express = require('express');
const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

const creatingDb = express.Router();

creatingDb.post('/createDb/pets', async (req, res) => {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = `CREATE TABLE ${dbConfig.database}.pets (id INT AUTO_INCREMENT , name TEXT , dob DATE , client_email VARCHAR(255) , archived INT(2) DEFAULT '0' , PRIMARY KEY (id)) ENGINE = InnoDB;`;
    const [result] = await conn.query(sql);
    res.json(result);
  } catch (error) {
    console.log('creating db error=====', error);
    res.status(500).json('something is wrong');
  } finally {
    await conn?.end();
  }
});

creatingDb.post('/createDb/logs', async (req, res) => {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = `CREATE TABLE ${dbConfig.database}.logs (id INT AUTO_INCREMENT , pets_id INT , description TEXT , status TEXT , PRIMARY KEY (id)) ENGINE = InnoDB;`;
    const [result] = await conn.query(sql);
    res.json(result);
  } catch (error) {
    console.log('creating db error=====', error);
    res.status(500).json('something is wrong');
  } finally {
    await conn?.end();
  }
});

creatingDb.post('/createDb/medications', async (req, res) => {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = `CREATE TABLE ${dbConfig.database}.medications (id INT AUTO_INCREMENT , name TEXT, description TEXT , PRIMARY KEY (id)) ENGINE = InnoDB;`;
    const [result] = await conn.query(sql);
    res.json(result);
  } catch (error) {
    console.log('creating db error=====', error);
    res.status(500).json('something is wrong');
  } finally {
    await conn?.end();
  }
});

creatingDb.post('/createDb/prescriptions', async (req, res) => {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = `CREATE TABLE ${dbConfig.database}.prescriptions (id INT AUTO_INCREMENT , medication_id INT, pet_id INT , comment TEXT , timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (id)) ENGINE = InnoDB;`;
    const [result] = await conn.query(sql);
    res.json(result);
  } catch (error) {
    console.log('creating db error=====', error);
    res.status(500).json('something is wrong');
  } finally {
    await conn?.end();
  }
});

module.exports = creatingDb;
