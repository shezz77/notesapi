const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const noteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Name is required",
        minlength: 4,
        maxlength: 150
    },
    handle: {
        type: String,
        required: "Handle is required",
        minlength: 4,
        maxlength: 150
    },

    notes: [{ type: ObjectId, ref: 'Note'}]
});

module.exports = mongoose.model('Label', noteSchema);
