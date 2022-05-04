const express = require('express');
const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

const medicationsRoutes = express.Router();

module.exports = medicationsRoutes;
