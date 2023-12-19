module.exports = mongoose => {
    const addItemSchema = new mongoose.Schema({
        type: { type: String , required: true},
        item: { type: String , required: true},
        cost: { type: Number , required: true},
    });


    const AddItems = mongoose.model('AddItems', addItemSchema);
    return AddItems;
};