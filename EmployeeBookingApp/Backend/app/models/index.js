const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.Employee = require("./employee.model.js")(mongoose);
db.Employer = require("./employer.model.js")(mongoose);
db.Admin = require("./admin.model.js")(mongoose);
db.Complain = require("./complain.models.js")(mongoose);
db.Item = require("./item.model.js")(mongoose);
db.WorkType = require("./workType.model.js")(mongoose);
module.exports = db;