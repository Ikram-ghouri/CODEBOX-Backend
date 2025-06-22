const express = require('express');
const router = express.Router({ mergeParams: true });
const productBacklogController = require('../controllers/productBacklogControllers');
const authMiddleware = require('../middleware/authMiddleware');

const auth = authMiddleware;

router.get('/', auth, productBacklogController.getProductBacklogs);
router.post('/', auth, productBacklogController.createProductBacklog);
router.put('/:productBacklogId', auth, productBacklogController.updateProductBacklog);
router.delete('/:productBacklogId', auth, productBacklogController.deleteProductBacklog);

module.exports = router;
