const ContactSubmission = require('../models/ContactSubmission');

// Get all contact submissions
const getAllContactSubmissions = async (req, res) => {
  try {
    const submissions = await ContactSubmission.find().sort({ createdAt: -1 });
    res.json(submissions);
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get single contact submission
const getContactSubmissionById = async (req, res) => {
  try {
    const submission = await ContactSubmission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ error: 'Contact submission not found' });
    }
    res.json(submission);
  } catch (error) {
    console.error('Error fetching contact submission:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Create new contact submission
const createContactSubmission = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Name, email, subject and message are required' });
    }

    const submission = new ContactSubmission({
      name,
      email,
      phone: phone || '',
      subject,
      message
    });

    const savedSubmission = await submission.save();
    res.status(201).json(savedSubmission);
  } catch (error) {
    console.error('Error creating contact submission:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update contact submission status
const updateContactSubmission = async (req, res) => {
  try {
    const { status, isRead } = req.body;
    
    const submission = await ContactSubmission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ error: 'Contact submission not found' });
    }

    submission.status = status || submission.status;
    submission.isRead = isRead !== undefined ? isRead : submission.isRead;

    const updatedSubmission = await submission.save();
    res.json(updatedSubmission);
  } catch (error) {
    console.error('Error updating contact submission:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete contact submission
const deleteContactSubmission = async (req, res) => {
  try {
    const submission = await ContactSubmission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ error: 'Contact submission not found' });
    }

    await ContactSubmission.findByIdAndDelete(req.params.id);
    res.json({ message: 'Contact submission deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact submission:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getAllContactSubmissions,
  getContactSubmissionById,
  createContactSubmission,
  updateContactSubmission,
  deleteContactSubmission
};
