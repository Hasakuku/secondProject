const express = require('express');
const authRouter = require('./authRouter')
const router = express.Router();

router.use("/", authRouter);
// router.get("/", )

module.exports = router;
