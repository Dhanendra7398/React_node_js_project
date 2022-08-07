const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
     
    name: {
        type: String,
        require : true
    },
    age: {
        type: String,
        require : true
    },
    address: {
        type: String,
        require : true
    },
    contact: {
        type: String,
        require : true
    },
    profile : {
        type : String
    }

});

const users = new mongoose.model("employee", userSchema); // collection name ,Schema 

module.exports = users;