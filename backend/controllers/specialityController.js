const Speciality = require('../models/Speciality');

// Get all specialities
const getAllSpecialities = async (req, res) => {
  try {
    const specialities = await Speciality.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(specialities);
  } catch (error) {
    console.error('Error fetching specialities:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get single speciality
const getSpecialityById = async (req, res) => {
  try {
    const speciality = await Speciality.findById(req.params.id);
    if (!speciality) {
      return res.status(404).json({ error: 'Speciality not found' });
    }
    res.json(speciality);
  } catch (error) {
    console.error('Error fetching speciality:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Create new speciality
const createSpeciality = async (req, res) => {
  try {
    console.log('Received speciality creation request:', req.body)
    const { name, description, image, expertiseLevel } = req.body;
    
    if (!name || !description) {
      console.log('Missing required fields. Name:', !!name, 'Description:', !!description)
      return res.status(400).json({ error: 'Name and description are required' });
    }

    console.log('Creating speciality with data:', { name, description, image, expertiseLevel })

    const speciality = new Speciality({
      name,
      description,
      image: image || '',
      expertiseLevel: expertiseLevel || 'Intermediate'
    });

    const savedSpeciality = await speciality.save();
    console.log('Speciality created successfully:', savedSpeciality._id)
    res.status(201).json(savedSpeciality);
  } catch (error) {
    console.error('Error creating speciality:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update speciality
const updateSpeciality = async (req, res) => {
  try {
    const { name, description, image, expertiseLevel, isActive } = req.body;
    
    const speciality = await Speciality.findById(req.params.id);
    if (!speciality) {
      return res.status(404).json({ error: 'Speciality not found' });
    }

    speciality.name = name || speciality.name;
    speciality.description = description || speciality.description;
    speciality.image = image !== undefined ? image : speciality.image;
    speciality.expertiseLevel = expertiseLevel || speciality.expertiseLevel;
    speciality.isActive = isActive !== undefined ? isActive : speciality.isActive;

    const updatedSpeciality = await speciality.save();
    res.json(updatedSpeciality);
  } catch (error) {
    console.error('Error updating speciality:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete speciality
const deleteSpeciality = async (req, res) => {
  try {
    const speciality = await Speciality.findById(req.params.id);
    if (!speciality) {
      return res.status(404).json({ error: 'Speciality not found' });
    }

    await Speciality.findByIdAndDelete(req.params.id);
    res.json({ message: 'Speciality deleted successfully' });
  } catch (error) {
    console.error('Error deleting speciality:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getAllSpecialities,
  getSpecialityById,
  createSpeciality,
  updateSpeciality,
  deleteSpeciality
};
