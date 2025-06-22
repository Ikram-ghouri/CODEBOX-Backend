const ProductBacklog = require('../models/productBacklog');
const { body, validationResult } = require('express-validator');
/**
 * Get all product backlog items for a project
 */
exports.getProductBacklogs = async (req, res) => {
  try {
    const productBacklogs = await ProductBacklog.find({ project: req.params.projectId });
    res.json(productBacklogs);
  } catch (error) {
    res.status(500).json({ msg: 'Failed to fetch product backlog items', error: error.message });
  }
};

/**
 * Create a new product backlog item
 */
exports.createProductBacklog = async (req, res) => {
  try {
    const { title, description, priority, status } = req.body;
    const productBacklog = await ProductBacklog.create({
      title,
      description,
      priority,
      status,
      project: req.params.projectId
    });
    res.json(productBacklog);
  } catch (error) {
    res.status(500).json({ msg: 'Failed to create product backlog item', error: error.message });
  }
};


  // Update a product backlog item 

  exports.updateProductBacklog = async (req, res) => {
  try {
    const { title, description, priority, status } = req.body;
    const productBacklog = await ProductBacklog.findByIdAndUpdate(
      req.params.productBacklogId,
      { title, description, priority, status },
      { new: true }
    );
    if (!productBacklog) {
      return res.status(404).json({ msg: 'Product backlog item not found' });
    }
    res.json(productBacklog);
  } catch (error) {
    res.status(500).json({ msg: 'Failed to update product backlog item', error: error.message });
  }
};

/**
 * Delete a product backlog item
 */
exports.deleteProductBacklog = async (req, res) => {
  try {
    await ProductBacklog.findByIdAndDelete(req.params.productBacklogId);
    res.json({ msg: 'Product backlog item deleted' });
  } catch (error) {
    res.status(500).json({ msg: 'Failed to delete product backlog item', error: error.message });
  }
};
