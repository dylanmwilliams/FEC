const router = require('express').Router();
const controller = require('../controllers/products');

router.get('/:product_id/related', controller.getRelated);
router.get('/', controller.get);

module.exports = router;