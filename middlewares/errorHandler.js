/* eslint-disable no-console */
function  logErrors(err, req, res, next){ // midd 1.1
    console.error(err);
    next(err); // next : permite la ejecución del sig middleware
}

function errroHandler(err, req, res, next){ // midd 1.3 
    res.status(500).json({
        message: err.message,
        stack: err.stack,
    });
}

module.exports = {
    logErrors,
    errroHandler
}