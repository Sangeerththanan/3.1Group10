const db = require('../models');
const Complain = db.Complain;

// Add a new complain record and store

exports.create = (req, res) => {
  // Validate request
  if (!req.body.complain ) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

    // Create a complain
    const complain = new Complain({
      complain: req.body.complain
      ,
    });

    // Store a complain in the database
    complain
      .save(complain)
      .then(data => {
        res.json({ success: true, data });
        //res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the complain record."
        });
      });
};

// Fetch all complain records
exports.findAll= (req, res) => {
  Complain.find()
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found any complain "} );
      else res.json(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving the complainrecords"});
    });
};