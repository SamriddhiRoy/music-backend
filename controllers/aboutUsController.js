const AboutUs = require('../models/AboutUs');

// Get all about us entries
const getAllAboutUs = async (req, res) => {
  try {
    const aboutUs = await AboutUs.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(aboutUs);
  } catch (error) {
    console.error('Error fetching about us:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get single about us entry
const getAboutUsById = async (req, res) => {
  try {
    const aboutUs = await AboutUs.findById(req.params.id);
    if (!aboutUs) {
      return res.status(404).json({ error: 'About us entry not found' });
    }
    res.json(aboutUs);
  } catch (error) {
    console.error('Error fetching about us:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Create new about us entry
const createAboutUs = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const aboutUs = new AboutUs({
      title,
      description,
      image: image || ''
    });

    const savedAboutUs = await aboutUs.save();
    res.status(201).json(savedAboutUs);
  } catch (error) {
    console.error('Error creating about us:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update about us entry
const updateAboutUs = async (req, res) => {
  try {
    const { title, description, image, isActive } = req.body;
    
    const aboutUs = await AboutUs.findById(req.params.id);
    if (!aboutUs) {
      return res.status(404).json({ error: 'About us entry not found' });
    }

    aboutUs.title = title || aboutUs.title;
    aboutUs.description = description || aboutUs.description;
    aboutUs.image = image !== undefined ? image : aboutUs.image;
    aboutUs.isActive = isActive !== undefined ? isActive : aboutUs.isActive;

    const updatedAboutUs = await aboutUs.save();
    res.json(updatedAboutUs);
  } catch (error) {
    console.error('Error updating about us:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete about us entry
const deleteAboutUs = async (req, res) => {
  try {
    const aboutUs = await AboutUs.findById(req.params.id);
    if (!aboutUs) {
      return res.status(404).json({ error: 'About us entry not found' });
    }

    await AboutUs.findByIdAndDelete(req.params.id);
    res.json({ message: 'About us entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting about us:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getAllAboutUs,
  getAboutUsById,
  createAboutUs,
  updateAboutUs,
  deleteAboutUs
};
