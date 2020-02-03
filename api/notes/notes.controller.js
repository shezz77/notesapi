// const formidable = require("formidable");

const Note = require('./notes.model');
const _ = require('lodash');

exports.all = (req, res) => {
    console.log();
    Note.find({createdBy: req.user._id})
        .then(notes => {
            res.json({notes})
        })
        .catch(err => {
            console.log(err)
        })
};

exports.store = (req, res) => {
    // let form = new formidable.IncomingForm();
    // console.log(form);
    let note = new Note(req.body);
    note.createdBy = req.user;
    console.log(req.user);
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

exports.update = (req, res) => {
    Note.findById(req.body._id)
        .exec((err, note) => {
            if (err)
                return res.status(400).json({
                    error: err
                });
            note = _.extend(note, req.body);
            note.updateAt = Date.now();
            note.save((err, note) => {
                if (err)
                    return res.status(400).json({
                        error: err
                    });
                res.json({
                    message: 'New note updated',
                    note
                })
            })
        })
};

exports.destroy = ({body}, res) => {
    Note.findById(body._id).exec((err, note) => {
        if (err)
            return res.status(400).json({
                error: err
            });

        note.remove((err, post) => {
            if (err) {
                return res.status(400).json({
                    error: 'You are not authorized to perform this action'
                })
            }
            res.json({post, message: 'Note deleted successfully'});
        })
    });
};
