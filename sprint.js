const mongoose = require('mongoose');

const SprintSchema = new mongoose.Schema({
  name: { type: String, required: true },
  goal: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  productBacklogItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductBacklog' }],
  status: { type: String, enum: ['Planned', 'Active', 'Completed'], default: 'Planned' },
  createdAt: { type: Date, default: Date.now }
});

// Exports the Sprint model so it can be used in other parts of the app (like controllers or routes).
module.exports = mongoose.model('Sprint', SprintSchema);