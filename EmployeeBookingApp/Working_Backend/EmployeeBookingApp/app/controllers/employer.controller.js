const db = require('../models');
const Employer = db.Employer;

// Add a new employee record and store

exports.create= (req, res) => {
    // Validate request
        if (!req.body.name || !req.body.email || !req.body.password || !req.body.confirmPassword || !req.body.contactNo || !req.body.address) {
          res.status(400).send({ message: "Content can not be empty!" });
          return;
        }

       // Create a employee
      const employee = new Employer({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        contactNo: req.body.contactNo,
        address: req.body.address,
        });

     // Store a employee in the database
    employee
    .save(employee)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the employee record."
      });
    });
  };