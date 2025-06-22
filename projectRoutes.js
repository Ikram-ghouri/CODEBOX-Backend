const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectControllers');
const productBacklogController = require('../controllers/productBacklogControllers');
const authMiddleware = require('../middleware/authMiddleware');

const { getProjects, createProject } = projectController;
const { getProductBacklogs, createProductBacklog, updateProductBacklog, deleteProductBacklog } = productBacklogController;
const auth = authMiddleware;

router.get('/', auth, getProjects);
router.post('/', auth, createProject);

// Product Backlog routes
router.get('/:projectId/productBacklog', auth, getProductBacklogs);
router.post('/:projectId/productBacklog', auth, createProductBacklog);
router.put('/:projectId/productBacklog/:productBacklogId', auth, updateProductBacklog);
router.delete('/:projectId/productBacklog/:productBacklogId', auth, deleteProductBacklog);

module.exports = router;
