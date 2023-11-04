const db = require('../models');
const Employee = db.Employee;
const bcrypt = require('bcrypt');

// Add a new employee record and store

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.email || !req.body.password || !req.body.confirmPassword || !req.body.contactNo || !req.body.address || !req.body.workType) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Hash the password
  const saltRounds = 10; // Number of salt rounds for bcrypt
  bcrypt.hash(req.body.password, saltRounds, (err, hashedPassword) => {
    if (err) {
      res.status(500).send({
        message: "Error occurred while hashing the password."
      });
      return;
    }

    // Create a employee
    const employee = new Employee({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      //confirmPassword: req.body.confirmPassword,
      contactNo: req.body.contactNo,
      address: req.body.address,
      workType: req.body.workType,
      payment: req.body.payment ? req.body.payment : 250
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
  });
};