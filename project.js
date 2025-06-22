const mongoose = require('mongoose');

/**
 * Project schema representing a project with title, description,
 * owner (user who created it), and team members.
 * The owner is automatically removed from the team.
 * Timestamps are added for createdAt and updatedAt.
 */
const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  team: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

  ProjectSchema.pre('save', async function(next) {
    if (this.team.includes(this.owner)) {
      this.team = this.team.filter(member => member.toString() !== this.owner.toString());
    }
    next();
  });

module.exports = mongoose.model('Project', ProjectSchema);
