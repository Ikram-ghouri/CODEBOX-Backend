const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskControllers');
const authMiddleware = require('../middleware/authMiddleware');

const auth = authMiddleware;

// Get all tasks for a project
router.get('/:projectId', auth, taskController.getTasks);

// Create a new task for a project
router.post('/:projectId', auth, taskController.createTask);

// Get a task by ID
router.get('/task/:taskId', auth, taskController.getTaskById);

// Update a task by ID
router.put('/task/:taskId', auth, taskController.updateTask);

// Delete a task by ID
router.delete('/task/:taskId', auth, taskController.deleteTask);

// Update task status by ID
router.patch('/task/:taskId/status', auth, taskController.updateTaskStatus);

// Get tasks assigned to a user
router.get('/user/:userId', auth, taskController.getTasksByUser);

module.exports = router;
