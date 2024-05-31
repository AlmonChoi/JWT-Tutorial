const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const account = require("../models/account");

dotenv.config();

//  User creation
router.post("/create", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(`Email: ${email}, Password: ${password}`);

    // check if user existed
    const userExist = await account.findOne({ email });
    if (userExist) {
      return res.status(403).json({ error: "User existed" });
    }

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

    res.status(201).json({ userId: user._id });
  } catch (error) {
    console.log(error);
    res.status(403).json({ error: "User creation failed" });
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(`Email: ${email}, Password: ${password}`);
    const user = await account.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    jwtKey = process.env.JWT_KEY || "jwt secret key";
    const jwtToken = jwt.sign({ userId: user._id }, jwtKey, {
      expiresIn: "1h",
    });
    //const refreshToken = jwt.sign({ userId: user._id }, jwtKey, { expiresIn: '7d' });
    delete password;
    res.status(200).json({ jwtToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
