const mongoose = require("mongoose");
const start = (uri) =>{
     mongoose.connect(uri);
}
module.exports = start;