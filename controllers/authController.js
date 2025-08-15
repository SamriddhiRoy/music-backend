const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = require('../middleware/authMiddleware');

// Create default admin user
const createDefaultAdmin = async () => {
  try {
    console.log('🔄 Checking for existing admin user...');
    const existingAdmin = await User.findOne({ username: 'admin' });
    
    if (!existingAdmin) {
      console.log('🔄 Creating default admin user...');
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const adminUser = await User.create({
        username: 'admin',
        email: 'admin@musicadmin.com',
        password: hashedPassword
      });
      console.log('✅ Default admin user created successfully:', adminUser.username);
    } else {
      console.log('✅ Admin user already exists');
    }
  } catch (error) {
    console.error('❌ Error creating admin user:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Full error:', error);
    throw error; // Re-throw to be caught by the main error handler
  }
};

// Login user
const login = async (req, res) => {
  try {
    console.log('🔄 Login attempt for user:', req.body.username);
    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      console.log('❌ Login failed: User not found');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('❌ Login failed: Invalid password');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('✅ Login successful for user:', username);
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('❌ Login error:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Full error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  login,
  createDefaultAdmin
};
