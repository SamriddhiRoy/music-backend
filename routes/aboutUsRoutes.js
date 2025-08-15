const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getAllAboutUs,
  getAboutUsById,
  createAboutUs,
  updateAboutUs,
  deleteAboutUs
} = require('../controllers/aboutUsController');

// Public routes
router.get('/', getAllAboutUs);
router.get('/:id', getAboutUsById);

// Protected routes (require authentication)
router.post('/', protect, createAboutUs);
router.put('/:id', protect, updateAboutUs);
router.delete('/:id', protect, deleteAboutUs);

module.exports = router;
