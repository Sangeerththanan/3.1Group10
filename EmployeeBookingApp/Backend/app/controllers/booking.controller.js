const db = require('../models');
const Booking = db.Booking;

// Add a new employee record and store

exports.create = (req, res) => {
    // Validate request
    if (!req.body.employer || !req.body.type || !req.body.employee) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a booking
    const booking = new Booking({
        ERemail: req.body.ERemail,
        employer: req.body.employer,
        type: req.body.type,
        employee: req.body.employee,
        EEemail: req.body.EEemail
    });

    // Store a booking in the database
    booking
        .save(booking)
        .then(data => {
            res.json({ success: true, data });
            //res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the booking record."
            });
        });
};

// Fetch all booking records
exports.findAll = (req, res) => {
    Booking.find()
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found any booking " });
            else res.json(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving the booking records" });
        });
};

// Get discount details by bookings
//
exports.findType = (req, res) => {
    const { ERemail } = req.params;
    Booking.find({ ERemail })
        .then(data => {
            if (!data)
                res.status(404).send({ message: `Not found booking with email: ${ERemail}` });
            else res.json(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: `Error retrieving booking with email: + ${ERemail}` });
        });
};

// Get Booking details by Employee's email
exports.findEmployment = (req, res) => {
    const { EEemail } = req.params;
    Booking.find({ EEemail })
        .then(data => {
            if (!data)
                res.status(404).send({ message: `Not found booking with email: ${EEemail}` });
            else res.json(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: `Error retrieving booking with email: + ${EEemail}` });
        });
};
