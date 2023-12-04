module.exports = app => {
    const employees = require('../controllers/employee.controller.js');
    const employers = require('../controllers/employer.controller.js');
    const admin = require('../controllers/admin.controller.js');
    const express = require('express');
    const router = express.Router();

    // Create a new employee, employer record
    router.post("/employees", employees.create);
    router.post("/employers", employers.create);

    // Signin
    router.post("/employees/signin", employees.signin);
    router.post("/employers/signin", employers.signin);
    router.post("/admin/signin", admin.signin);
    
    

    // Retrieve a single employe with email
    router.get("/employees/:email", employees.findOne);
    //router.get("/employers/:email", employers.findOne);

    // Update a journal with id
    router.put("/employees/:email", employees.update);
    //router.put("/employers/:email", employers.update);

    // Update employee status by email
    router.put("/employees/status/:email", employees.updateStatus);
    

    app.use("/api", router);
};