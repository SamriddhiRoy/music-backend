const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getAllBanners,
  getBannerById,
  createBanner,
  updateBanner,
  deleteBanner
} = require('../controllers/bannerController');

// Public routes
router.get('/', getAllBanners);
router.get('/:id', getBannerById);

// Protected routes (require authentication)
router.post('/', protect, createBanner);
router.put('/:id', protect, updateBanner);
router.delete('/:id', protect, deleteBanner);

module.exports = router;
