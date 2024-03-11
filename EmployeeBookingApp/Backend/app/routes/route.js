module.exports = app => {
    const employees = require('../controllers/employee.controller.js');
    const employers = require('../controllers/employer.controller.js');
    const admin = require('../controllers/admin.controller.js');
    const complains = require('../controllers/complain.controller.js');
    const items = require('../controllers/item.controller.js');
    const workTypes = require('../controllers/workType.controller.js');
    const booking = require('../controllers/booking.controller.js');

    const express = require('express');
    const router = express.Router();

    // Create a new employee, employer, item, workType record
    router.post("/employees", employees.create);
    router.post("/employers", employers.create);
    router.post("/complains", complains.create);
    router.post("/items", items.create);
    router.post("/addWorkType", workTypes.create);
    router.post("/booking", booking.create);

    // Signin
    router.post("/employees/signin", employees.signin);
    router.post("/employers/signin", employers.signin);
    router.post("/admin/signin", admin.signin);



    // Retrieve a single employee with email
    router.get("/employees/:email", employees.findOne);
    router.get("/employers/:email", employers.findOne);

    // Update a journal with id
    router.put("/employees/:email", employees.update);
    //router.put("/employers/:email", employers.update);

    // Update employee status by email
    router.put("/employees/status/:email", employees.updateStatus);

    // Retrieve all employees
    router.get("/employees", employees.findAll);
    router.get("/complains", complains.findAll);
    router.get("/items", items.findAll);
    router.get("/workTypes",workTypes.findAll);
    router.get("/booking",booking.findAll);

    // Delete a employee with id
    router.delete("/employees/:email", employees.delete);

    // Retrieve employees with work type
    router.get("/employees/workType/:workType", employees.findType);

    app.use("/api", router);
};