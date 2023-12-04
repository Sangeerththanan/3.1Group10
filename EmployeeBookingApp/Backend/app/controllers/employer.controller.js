const db = require('../models');
const Employer = db.Employer;

// Add a new employee record and store

exports.create= (req, res) => {
    // Validate request
        if (!req.body.name || !req.body.email || !req.body.password || !req.body.confirmPassword || !req.body.contactNo || !req.body.address) {
          res.status(400).send({ message: "Content can not be empty!" });
          return;
        }

       // Create a employer
      const employer = new Employer({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        contactNo: req.body.contactNo,
        address: req.body.address,
        type: req.body.type,
        });

     // Store a employer in the database
    employer
    .save(employer)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the employee record."
      });
    });
    // Authentication of the employer
exports.signin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const { email, password } = req.body;
  try {
    const employer = await Employer.findOne({ email });
    if (!employer) {
      return res.json({ success: false, message: 'Employee not found with the given email' });
    }
    const isMatch = await employer.comparePassword(password);
    if (!isMatch) {
      return res.json({ success: false, message: 'Email or password does not match' });
    }
    return res.json({ success: true, employer });
  } catch (error) {
    console.error('Error occurred while signing in:', error); // Log the actual error for debugging
    res.status(500).send({
      message: "Internal server error occurred while signing in."
    });
  }
};

// Get employer details by email
exports.findOne = (req, res) => {
  const {email}= req.params;
  Employer.findOne({email})
    .then(data => {
      if (!data)
      res.status(404).send({ message: `Not found student with email: ${email}` });
      else res.json(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: `Error retrieving student with email: + ${email}`});
    });
  };
};