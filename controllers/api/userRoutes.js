const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require("bcrypt");



// POST / signup
router.post("/", async (req, res) => {
  try {
    if (!req.body.email || !req.body.password || !req.body.name) {
      res
        .status(400)
        .json({ message: "Please provide a name, email, and password" });
      return;
    }
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
   
    const userData = await User.create(req.body);
    delete userData.password;
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// POST / login
router.post("/signin", async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: "Please provide an email and password" });
    }

    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const validPassword = await bcrypt.compare(req.body.password, userData.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);
        return res.status(500).json({ message: "Session save failed" });
      }
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.redirect("/dashboard"); // Redirect to /blogs after login
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal error, try again later" });
  }
});





router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
