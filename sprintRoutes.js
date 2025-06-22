const express = require('express');
const router = express.Router({ mergeParams: true });
const authMiddleware = require('../middleware/authMiddleware');
const sprintController = require('../controllers/taskControllers');

const auth = authMiddleware;

router.get('/', auth, sprintController.getSprints);
router.post('/', auth, sprintController.createSprint);
router.put('/:sprintId', auth, sprintController.updateSprint);
router.delete('/:sprintId', auth, sprintController.deleteSprint);

module.exports = router;
