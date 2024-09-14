const mongoose = require('mongoose')
const studentModel = require("./model/student.model1")
/**
 *  Write  the code to connect with MongoDB
 */
// mongoose.connect("mongodb://localhost/be_demodb")  //if it does not work, replace 'localhost' to '127.0.0.1'
mongoose.connect("mongodb://127.0.0.1/be_demodb") //

const db = mongoose.connection // start the connection with MongoDB
// After starting the connection with MongoDB, whether it is success or failure

/**
 * handling the error
 */
db.on("error", ()=>{  // if there is failure, it htrows a event called 'error'
    console.log("Error while connecting to DB")
})

// if it is successful
db.once("open", ()=>{  // if there is success, it htrows a event called 'open'
    console.log("Connected to MongoDB")
    // Logic to insert data into the DB
    init()

    // Running the queries on MongoDB
    dbQueries()
})


async function init(){
    // Logic to insert data in the db
    const student = {
        name : "Rakesh",
        age : 99,
        email : "rakeshyadav36k@gmail.com",
        subjects : ["Maths", "English"]
    }

    const std_obj = await studentModel.create(student) // we have to wait at this step

    console.log(std_obj)
}

async function dbQueries(){
    // Read the student data
    console.log("Inside the dbQueries function")
    // Read the student data based on the id
    try{
        const student = await studentModel.findById("66bc82d17ac016f0d655b17f")
        console.log(student)
    }
    catch(err){
        console.log(err)
    }

    // I want to go and search based on name
    try{
        // const students = await studentModel.find({name:"Rakesh"})
        // const students = await studentModel.find({})  // acts like a find all
        const students = await studentModel.findOne({name:"Rakesh"})
        console.log(students)
    }catch(err){
        console.log(err)
    }


    /**
     * Deal with the multiple conditions
     */
    const stds = await studentModel.where("age").gt("10").where("name").equals("Rakesh").limit(2)
    console.log(stds)


    /**
     * Delete one documents where name = "Vishwa"
     */

    const student = await studentModel.deleteOne({name : "Vishwa"})
    console.log(student)
}