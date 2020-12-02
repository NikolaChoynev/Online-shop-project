const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { productController, commentsController } = require('../controllers');

router.get('/', productController.getProducts);
router.post('/', auth(), productController.createProduct);

router.get('/:productId', productController.getProduct);
router.put('/:productId', auth(), productController.editProduct);
router.delete('/:productId', auth(), productController.deleteProdict);
router.post('/:productId', auth(), productController.buyProduct);

router.post('/comment/:productId', auth(), commentsController.createComment);
router.put('/:productId/comment/:commentId', auth(), commentsController.editComment);
router.delete('/:productId/comment/:commentId', auth(), commentsController.deleteComment)

module.exports = router;





