const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getAllContactSubmissions,
  getContactSubmissionById,
  createContactSubmission,
  updateContactSubmission,
  deleteContactSubmission
} = require('../controllers/contactController');

// Public route for submitting contact form
router.post('/', createContactSubmission);

// Protected routes (require authentication)
router.get('/', protect, getAllContactSubmissions);
router.get('/:id', protect, getContactSubmissionById);
router.put('/:id', protect, updateContactSubmission);
router.delete('/:id', protect, deleteContactSubmission);

module.exports = router;
