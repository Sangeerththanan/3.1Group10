const bcrypt = require('bcrypt');

module.exports = mongoose => {
    const adminSchema = new mongoose.Schema({
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },

    });

    adminSchema.method("toJSON", function () {
        const { __v, _id, confirmPassword, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    // Define comparePassword method on the schema
    adminSchema.methods.comparePassword = async function (candidatePassword) {
        try {
            return await bcrypt.compare(candidatePassword, this.password);
        } catch (error) {
            throw error;
        }
    };

    const Admin = mongoose.model('Admin', adminSchema);
    return Admin;
};