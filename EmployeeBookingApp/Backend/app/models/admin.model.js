const bcrypt = require('bcrypt');

module.exports = mongoose => {
    const employeeSchema = new mongoose.Schema({
            email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
       
    });

    adminSchema.method("toJSON", function () {
        const { __v, _id, password, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

  

    const Admin = mongoose.model('Employee', adminSchema);
    return Admin;
};