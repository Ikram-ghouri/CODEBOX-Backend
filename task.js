const mongoose = require('mongoose');

/**
 * Task schema representing a task within a project,
 * with title, assigned user, and status.
 * Timestamps are added for createdAt and updatedAt.
 */
const TaskSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  title: { type: String, required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['todo', 'in-progress', 'done'], default: 'todo' }
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
