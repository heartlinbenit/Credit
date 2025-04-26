const express = require('express');
const router = express.Router();

// Simple Admin login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Hardcoded Admin Credentials
  if (username === 'admin' && password === 'admin123') {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

module.exports = router;
