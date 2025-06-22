const mongoose = require('mongoose');

const ProductBacklogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  priority: { type: Number, default: 0 },
  status: { type: String, enum: ['Pending', 'InProgress', 'Completed'], default: 'Pending' },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  createdAt: { type: Date, default: Date.now }
});

// Export the schema as a Mongoose model named 'ProductBacklog', making it available for CRUD operations elsewhere in your application.
module.exports = mongoose.model('ProductBacklog', ProductBacklogSchema);

