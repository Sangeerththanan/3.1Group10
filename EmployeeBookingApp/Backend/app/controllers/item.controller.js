const db = require('../models');
const Item = db.Item;

// Add a new record and store

exports.create = (req, res) => {
  // Validate request
  if (!req.body.type || !req.body.item || !req.body.cost) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create the adding items
  const item = new Item({
    type: req.body.type,
    item: req.body.item,
    cost: req.body.cost,

  });

  // Store a items in the database
  item
    .save(item)
    .then(data => {
      res.json({ success: true, data });
      //res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the item record."
      });
    });
};

// Fetch all items records
exports.findAll = (req, res) => {
  Item.find()
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found any items " });
      else res.json(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving the items records" });
    });
};

// Get items details by types
exports.findType = (req, res) => {
  const { type } = req.params;
  console.log(type);
  Item.find({ type })
    .then(data => {
      if (!data)
        res.status(404).send({ message: `Not found item with type: ${type}` });
      else res.json(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: `Error retrieving item with type: + ${type}` });
    });
};