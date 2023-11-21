const express = require('express');
const userRouter = require('./userRouter');
const lodgingRouter = require('./lodgingRouter');
const attractionRouter = require('./attractionRouter');
const router = express.Router();

router.use("/users", userRouter);
router.use("/lodgings", lodgingRouter);
router.use("/attractions", attractionRouter);

module.exports = router;
