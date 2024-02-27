const mongoose = require("mongoose")

const AssignUser = mongoose.Schema({
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    dob: {
        type: String,
        require: true
    },
    Rstreet1: {

        type: String,
        require: true
    },
    Rstreet2: {
        type: String,
        require: true
    },
    Pstreet1: {
        type: String,
        require: true
    },
    Pstreet2: {
        type: String,
        require: true
    },
    filename1: {
        type: String,
        require: true
    },
    typefile: {
        type: String,
        require: true
    },
    file1: {
        type: String,
    },
    filename2: {
        type: String,
        require: true
    },
    typefile2: {
        type: String,
        require: true
    },

    file2: {
        type: String,
    },

})

const Assignuser = mongoose.model("Assignuser", AssignUser)
module.exports = Assignuser