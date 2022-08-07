const mongoose = require("mongoose");
const DB = "mongodb://localhost:27017/bodex"

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    
}).then(() => {
    console.log("connected start")
}).catch((error) => {
    console.log(error.message);
})