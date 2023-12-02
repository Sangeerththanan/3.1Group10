const db = require('../models');
const Admin= db.Admin;
const bcrypt = require('bcrypt');

// Add a new employee record and store





    
// Authentication of the employee
exports.signin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!employee) {
      return res.json({ success: false, message: 'Employee not found with the given email' });
    }
    const isMatch = await employee.comparePassword(password);
    if (!isMatch) {
      return res.json({ success: false, message: 'Email or password does not match' });
    }
    return res.json({ success: true, employee });
  } catch (error) {
    console.error('Error occurred while signing in:', error); // Log the actual error for debugging
    res.status(500).send({
      message: "Internal server error occurred while signing in."
    });
  }
};
 