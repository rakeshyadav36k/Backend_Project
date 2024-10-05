/**
 * 1. Define the schema of students collection to be
 * stored in the DB
 */

const mongoose = require("mongoose")

// 2. Schema with constraints
const studentSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        min : 19
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        minLength : 15
    },
    subjects : [String]
    /*
    createdAt : {
        type : Date,
        immutable : true,
        default : () => {
            return Date.now()
        }
    } */
}, {versionKey : false, timestamps : true})   // by using 'timestamp' as true - 'createdAt' and 'modifyAt' show in the DB
                                                // by using 'versionKey' as false, version does not show in the DB

// 3. Go ahead and create corresponding collection in DB
module.exports = mongoose.model("Student", studentSchema) //("Name of the collection", schema of the documents)
