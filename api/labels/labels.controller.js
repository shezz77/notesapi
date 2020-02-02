const Label = require('./labels.model');
const _ = require('lodash');

exports.all = (req, res) => {
    Label.find()
        .then(labels => {
            res.json({labels})
        })
        .catch(err => {
            console.log(err)
        })
};

exports.store = (req, res) => {
    let label = new Label(req.body);
    label.save((err, label) => {
        if (err)
            return res.status(400).json({
                error: err
            });
        res.json({
            message: 'New label created',
            label
        })
    })
};

exports.update = (req, res) => {
    console.log(req.body);
    let label = new Label(req.body);
    label.save((err, label) => {
        if (err)
            return res.status(400).json({
                error: err
            });
        res.json({
            message: 'New label created',
            label
        })
    })
};
