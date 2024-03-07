const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path')
const account = require('../models/account');

let config = JSON.parse(fs.readFileSync(path.join(__dirname, '../config', 'settings.json'), 'utf8'));

//  User creation
router.post('/create', async (req, res) => {
try {
  const { email, password } = req.body;
  console.log(`Email: ${email}, Password: ${password}` );
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new account({ email, password: hashedPassword });
  delete password;
  user
    .save()
    .then((rec) => {
      console.log(`Create user document ${rec}`);
    })
    .catch((error) => {
      console.error(error);
    });

  res.status(201).json({ message: 'User created' });

} catch (error) {
  console.log(error)
  res.status(500).json({ error: 'User creation failed' });
}
});

// User login
router.post('/login', async (req, res) => {
try {
  const { email, password } = req.body;
  console.log(`Email: ${email}, Password: ${password}` );
  const user = await account.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: 'Authentication failed' });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ error: 'Authentication failed' });
  }
  const jwtToken = jwt.sign({ userId: user._id }, config['jwtKey'], { expiresIn: '1h' });
  //const refreshToken = jwt.sign({ userId: user._id }, config['jwtKey'], { expiresIn: '7d' });
  delete password;
  res.cookie("token", jwtToken);
  res.status(200).json({ jwtToken });

} catch (error) {
  console.log(error)
  res.status(500).json({ error: 'Login failed' });
}
});

module.exports = router;
