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
      res
        .status(400)
        .json({ message: "Please provide a email and password" });
      return;
    }
    console.log("testing user string", req.body)
    const userData = await User.findOne({
      where: { email: req.body.email },
    });
    console.log("testing log in", userData)
    if (!userData) {
      res.status(400).json({ message: "User does not exist" });
      return;
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect email or password" });
      return;
    }
    delete userData.password;
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: "You are now logged in" });
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Error try again later" });
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
