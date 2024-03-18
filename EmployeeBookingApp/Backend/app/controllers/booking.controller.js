const db = require('../models');
const Booking = db.Booking;

// Add a new booking record
exports.create = (req, res) => {
    // Validate request
    if (!req.body.employer || !req.body.type || !req.body.employee) {
        return res.status(400).json({ success: false, message: "Missing required fields: employer, type, employee" });
    }

    // Create a booking
    const booking = new Booking({
        ERemail: req.body.ERemail,
        employer: req.body.employer,
        type: req.body.type,
        employee: req.body.employee,
        EEemail: req.body.EEemail
    });

    // Store the booking in the database
    booking.save()
        .then(data => {
            res.status(201).json({ success: true, data });
        })
        .catch(err => {
            console.error("Error creating the booking record:", err);
            res.status(500).json({ success: false, message: "Error creating the booking record" });
        });
};

// Fetch all booking records
exports.findAll = (req, res) => {
    Booking.find()
        .then(data => {
            if (!data || data.length === 0)
                res.status(404).json({ success: false, message: "No booking records found" });
            else
                res.json({ success: true, data });
        })
        .catch(err => {
            console.error("Error retrieving booking records:", err);
            res.status(500).json({ success: false, message: "Error retrieving booking records" });
        });
};

// Get bookings by ERemail
exports.findType = (req, res) => {
    const { ERemail } = req.params;
    Booking.find({ ERemail })
        .then(data => {
            if (!data || data.length === 0)
                res.status(404).json({ success: false, message: `Not found booking with email: ${ERemail}` });
            else
                res.json({ success: true, data });
        })
        .catch(err => {
            console.error(`Error retrieving booking with email: ${ERemail}`, err);
            res.status(500).json({ success: false, message: `Error retrieving booking with email: ${ERemail}` });
        });
};
