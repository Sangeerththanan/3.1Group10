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
        res.json({ success: true, data });
        //res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the employee record."
        });
      });
  });
};

// Authentication of the employee
exports.signin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const { email, password } = req.body;
  try {
    const employee = await Employee.findOne({ email });
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

// Get employee details by email
exports.findOne = (req, res) => {
  const {email}= req.params;
  Employee.findOne({email})
    .then(data => {
      if (!data)
      res.status(404).send({ message: `Not found employee with email: ${email}` });
      else res.json(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: `Error retrieving employee with email: + ${email}`});
    });
};

// Update a employee by the email in the request
exports.update = (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password || !req.body.confirmPassword || !req.body.contactNo || !req.body.address || !req.body.workType) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const email = req.params.email;

  // If the request includes a new password, hash it before updating
  if (req.body.password) {
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, (err, hashedPassword) => {
      if (err) {
        return res.status(500).send({
          message: "Error occurred while hashing the password."
        });
      }
      req.body.password = hashedPassword;

      // Use findOneAndUpdate to update the employee record
      Employee.findOneAndUpdate({ email: email }, req.body, { useFindAndModify: false, new: true })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update employee with email=${email}. Maybe employee was not found!`
            });
          } else {
            // res.send({ message: "Employee was updated successfully.", updatedEmployee: data });
            res.json({ success: true, data });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating employee with email=" + email
          });
        });
    });
  } else {
    // If no password is provided, update the record without hashing the password
    Employee.findOneAndUpdate({ email: email }, req.body, { useFindAndModify: false, new: true })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update employee with email=${email}. Maybe employee was not found!`
          });
        } else {
          res.send({ message: "Employee was updated successfully.", updatedEmployee: data });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating employee with email=" + email
        });
      });
  }
};

// Update employee status by email
exports.updateStatus = async (req, res) => {
  const { email } = req.params;
  const { status } = req.body;

  try {
    // Update the employee status in the database
    const updatedEmployee = await Employee.findOneAndUpdate(
      { email },
      { $set: { status } },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    return res.json(updatedEmployee);
  } catch (error) {
    console.error('Error updating employee status:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Fetch all employee records
exports.findAll= (req, res) => {
  Employee.find()
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found any employee "} );
      else res.json(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving the employeerecords"});
    });
};

// Delete a employee record by registration number
exports.delete = (req, res) => {
  const {email}  = req.params;

    Employee.findOneAndDelete({email}, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: "Cannot delete stuedent with email=${{ email } }. Maybe employee was not found!"
        });
      } else {
        res.send({
          message: "Employee record was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete employee with { email } =" + email });
    });
};