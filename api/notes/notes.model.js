const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 150
    },
    description: {
        type: String,
        maxlength: 4000
    },
    archive: {
        type: Boolean,
        default: false
    },
    image: String,
    time: {
        type: Date,
        default: Date.now
    },
    reminder: {
        type: Date,
        default: Date.now
    },
    checklist: Array,
    labels: [{ type: ObjectId, ref: 'Label'}],
    createdBy: {
        type: ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Note', noteSchema);
