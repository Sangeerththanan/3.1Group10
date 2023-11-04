module.exports = app => {
    const employees = require('../controllers/employee.controller.js');
    const employers = require('../controllers/employer.controller.js');
    const express = require('express');
    const router = express.Router();

    // Create a new employee, employer record
    router.post("/employees", employees.create);
    router.post("/employers", employers.create);
    
    app.use("/api", router);
};