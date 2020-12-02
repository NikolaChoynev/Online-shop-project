const router = require('express').Router();
const users = require('./users');
const products = require('./products')
const comments = require('./likes')

router.use('/users', users);
router.use('/products', products);
router.use('/likes', comments);

module.exports = router;