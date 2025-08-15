const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getAllSpecialities,
  getSpecialityById,
  createSpeciality,
  updateSpeciality,
  deleteSpeciality
} = require('../controllers/specialityController');

// Public routes
router.get('/', getAllSpecialities);
router.get('/:id', getSpecialityById);

// Protected routes (require authentication)
router.post('/', protect, createSpeciality);
router.put('/:id', protect, updateSpeciality);
router.delete('/:id', protect, deleteSpeciality);

module.exports = router;
