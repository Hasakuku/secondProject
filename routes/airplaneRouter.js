const express = require('express');
const airplaneController= require('../controllers/airplaneController')
const router = express.Router();

router.get("/", airplaneController)

module.exports = router;