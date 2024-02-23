const db = require('../models');
const WorkType = db.WorkType;

//Add a new work type and store

exports.create = (req, res) => {
    //validate request
    if(!req.body.workType){
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }

    // Create a work type
    const workType = new WorkType({
        workType: req.body.workType,
    });

    // Store a work type in the database
    workType
      .save(workType)
      .then(data => {
        res.json({ success: true, data });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the work type record."
        });
      });
};

// Fetch all work type records
exports.findAll= (req, res) => {
  WorkType.find()
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found any work type "} );
      else res.json(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving the work types"});
    });
};
