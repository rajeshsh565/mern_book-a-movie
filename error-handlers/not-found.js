const notFound = (req,res) => {
     res.status(404).send("Something is Missing!");
}
module.exports = notFound;