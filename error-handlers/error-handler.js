const errorHandlerMiddleware = (err, req, res, next) => {
     console.log(err);
     res.status(500).json({msg: "Something isn't working, please try again!", err});
}
module.exports = errorHandlerMiddleware;