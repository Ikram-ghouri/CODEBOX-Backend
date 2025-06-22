const Task = require('../models/task');
const Sprint = require('../models/sprint');
const { body, validationResult } = require('express-validator');

/**
 * Get all tasks for a project
 */
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId }).populate('assignedTo');
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

/**
 * Create a new task for a project
 * Validates input and creates task
 */
exports.createTask = [
  // Validation rules
  body('title').notEmpty().withMessage('Title is required'),
  body('assignedTo').optional().isMongoId().withMessage('AssignedTo must be a valid user ID'),

  async (req, res) => {
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, assignedTo } = req.body;
    try {
      const task = await Task.create({
        project: req.params.projectId,
        title,
        assignedTo
      });
      res.status(201).json(task);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server error' });
    }
  }
];

/**
 * Update a task by ID
 * Validates input and updates task
 */
exports.updateTask = [
  // Validation rules
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('assignedTo').optional().isMongoId().withMessage('AssignedTo must be a valid user ID'),

  async (req, res) => {
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, assignedTo } = req.body;
    try {
      const task = await Task.findByIdAndUpdate(
        req.params.taskId,
        { title, assignedTo },
        { new: true }
      );
      if (!task) {
        return res.status(404).json({ msg: 'Task not found' });
      }
      res.json(task);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server error' });
    }
  }
];

/**
 * Delete a task by ID
 */
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.taskId);
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }
    res.json({ msg: 'Task deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

/**
 * Update task status by ID
 * Validates status and updates task
 */
exports.updateTaskStatus = [
  // Validation rules
  body('status').isIn(['todo', 'in-progress', 'done']).withMessage('Invalid status'),

  async (req, res) => {
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { status } = req.body;
    try {
      const task = await Task.findByIdAndUpdate(
        req.params.taskId,
        { status },
        { new: true }
      );
      if (!task) {
        return res.status(404).json({ msg: 'Task not found' });
      }
      res.json(task);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server error' });
    }
  }
];

/**
 * Get a task by ID
 */
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId).populate('assignedTo');
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

/**
 * Get tasks assigned to a user
 */
exports.getTasksByUser = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.params.userId }).populate('project');
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

/**
 * Get all sprints for a project
 */
exports.getSprints = async (req, res) => {
  try {
    const sprints = await Sprint.find({ project: req.params.projectId }).populate('productBacklogItems');
    res.json(sprints);
  } catch (error) {
    res.status(500).json({ msg: 'Failed to fetch sprints', error: error.message });
  }
};

// /**
//  * Create a new sprint
//  */
exports.createSprint = async (req, res) => {
  try {
    const { name, goal, startDate, endDate, productBacklogItems, status } = req.body;
    const sprint = await Sprint.create({
      name,
      goal,
      startDate,
      endDate,
      productBacklogItems,
      status,
      project: req.params.projectId
    });
    res.json(sprint);
  } catch (error) {
    res.status(500).json({ msg: 'Failed to create sprint', error: error.message });
  }
};

// /**
//  * Update a sprint
//  */
exports.updateSprint = async (req, res) => {
  try {
    const { name, goal, startDate, endDate, productBacklogItems, status } = req.body;
    const sprint = await Sprint.findByIdAndUpdate(
      req.params.sprintId,
      { name, goal, startDate, endDate, productBacklogItems, status },
      { new: true }
    );
    if (!sprint) {
      return res.status(404).json({ msg: 'Sprint not found' });
    }
    res.json(sprint);
  } catch (error) {
    res.status(500).json({ msg: 'Failed to update sprint', error: error.message });
  }
};

// /**
//  * Delete a sprint
//  */
exports.deleteSprint = async (req, res) => {
  try {
    await Sprint.findByIdAndDelete(req.params.sprintId);
    res.json({ msg: 'Sprint deleted' });
  } catch (error) {
    res.status(500).json({ msg: 'Failed to delete sprint', error: error.message });
  }
};

// Added error handling middleware
exports.errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ msg: 'Server error' });
};

// Added validation error handling middleware
exports.validationErrorHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};