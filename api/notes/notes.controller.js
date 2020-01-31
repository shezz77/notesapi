const Note = require('./notes.model');
const _ = require('lodash');

exports.all = (req, res) => {
    Note.find()
        .then(notes => {
            res.json({notes})
        })
        .catch(err => {
            console.log(err)
        })
};

exports.store = (req, res) => {
    console.log(req.body);
    let note = new Note(req.body);
    note.save((err, note) => {
        if (err)
            return res.status(400).json({
                error: err
            });
        res.json({
            message: 'New note created',
            note
        })
    })
};
