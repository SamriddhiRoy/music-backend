const Banner = require('../models/Banner');

// Get all banners
const getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.json(banners);
  } catch (error) {
    console.error('Error fetching banners:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get single banner
const getBannerById = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ error: 'Banner not found' });
    }
    res.json(banner);
  } catch (error) {
    console.error('Error fetching banner:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Create new banner
const createBanner = async (req, res) => {
  try {
    console.log('Received banner creation request:', req.body)
    const { image } = req.body;
    
    if (!image) {
      console.log('Image field missing from request body')
      return res.status(400).json({ error: 'Image is required' });
    }

    console.log('Creating banner with image:', image)

    const banner = new Banner({
      image
    });

    const savedBanner = await banner.save();
    console.log('Banner created successfully:', savedBanner._id)
    res.status(201).json(savedBanner);
  } catch (error) {
    console.error('Error creating banner:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update banner
const updateBanner = async (req, res) => {
  try {
    const { image } = req.body;
    
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ error: 'Banner not found' });
    }

    banner.image = image || banner.image;

    const updatedBanner = await banner.save();
    res.json(updatedBanner);
  } catch (error) {
    console.error('Error updating banner:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete banner
const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ error: 'Banner not found' });
    }

    await Banner.findByIdAndDelete(req.params.id);
    res.json({ message: 'Banner deleted successfully' });
  } catch (error) {
    console.error('Error deleting banner:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getAllBanners,
  getBannerById,
  createBanner,
  updateBanner,
  deleteBanner
};
