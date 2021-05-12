exports.apiTestFunc = async (req, res, next) => {
    try {
        res.status(200).json({hi : "hi"});
    } catch (error) {
        next(error)
    }
};

/* fileinput api */
exports.apiInsertFiles = async (req, res, next) => {
    console.log(req);

    try {
        res.status(200).json({hi : "hi"});
    } catch (error) {
        next(error)
    }
};
