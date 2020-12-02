const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { commentsController } = require('../controllers');

router.put('/:commentId', auth(), commentsController.like);

module.exports = router;