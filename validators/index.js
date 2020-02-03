exports.createPostValidaor = (req, res, next) => {
    req.check('title', "Write a title").notEmpty();
    req.check('title', "Title must be between 4 to 150 characters").isLength({min: 4, max: 150});

    req.check('body', "Write a body").notEmpty();
    req.check('body', "Body must be between 4 to 2000 characters").isLength({min: 4, max: 2000});

    const errors = req.validationErrors();

    if(errors) {
        const firstError = errors.map((error) => error.msg)[0];
        return res.status(400).json({error: firstError});
    }

    next();
};

exports.userSignupValidator = (req, res, next) => {
    console.log(req.body);
    req.check('displayName', "Display Name is required").notEmpty();
    req.check('displayName', "display Name must be between 4 to 10 characters").isLength({min: 4, max: 10});

    req.check('email', "Write a email").notEmpty();
    req.check('email', "Email must be between 3 to 32 characters").isLength({min: 3, max: 32})
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @");

    req.check('password', "Write a password").notEmpty();
    req.check('password', "Password must be between 6 to 30 characters").isLength({min: 6, max: 30})
    .matches(/\d/)
    .withMessage('Password must contain a number');

    const errors = req.validationErrors();

    if(errors) {
        const firstError = errors.map((error) => error.msg)[0];
        return res.status(400).json({error: firstError});
    }

    next();
};
