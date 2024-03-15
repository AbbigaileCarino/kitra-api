const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userController.findUserByEmailAndPassword(email, password);
    if (user) {
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
