const db = require('../models');
const Admin = db.Admin;

// Authentication of the admin
exports.signin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.json({ success: false, message: 'Admin not found with the given email' });
    }
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.json({ success: false, message: 'Email or password does not match' });
    }
    return res.json({ success: true, admin });
  } catch (error) {
    console.error('Error occurred while signing in:', error); // Log the actual error for debugging
    res.status(500).send({
      message: "Internal server error occurred while signing in."
    });
  }
};

// Get admin details by email
exports.findOne = (req, res) => {
  const { email } = req.params;
  Admin.findOne({ email })
    .then(data => {
      if (!data)
        res.status(404).send({ message: `Not found student with email: ${email}` });
      else res.json(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: `Error retrieving student with email: + ${email}` });
    });
};
