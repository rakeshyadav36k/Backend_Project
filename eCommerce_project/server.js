/*
 * This will be the starting / entry file of the project
 */

const express = require("express")
const mongoose = require("mongoose")

const app = express()
const server_config = require("./configs/server.config")
const db_config = require("./configs/db.config")
const user_model = require("./models/user.model")
const bcrypt = require("bcryptjs")

app.use(express.json()) // middleware | when we pass request body as JSON, by using this middleware, It read as JS object


/**
 * Create an admin user at the starting of the 
 * application if not already present
 */


// Connection with MongoDB
mongoose.connect(db_config.DB_URL)

const db = mongoose.connection

db.on("error", ()=>{
    console.log("Error while connecting to the mongoDB");
})

db.once("open", ()=>{
    console.log("Conncted to MongoDB")
    init()
})

async function init(){
    try{

        let user = await user_model.findOne({userId : "admin"})
    
        if(user){
            console.log("Admin is already present");
            return
        }
    }catch(err){
        console.log("Error while reading the data", err);
    }

    try{

        user = await user_model.create({
            name : "Rakesh",
            userId : "admin",
            email : "rakeshyadav36k@gmail.com",
            userType : "ADMIN",
            password : bcrypt.hashSync("Welcome1", 8)
        })

        console.log("Admin created", user);

    }catch(err){
        console.log("Error while create admin", err);
    }
}



/**
 * Stich / connect the route to the server 
 */

require("./routes/auth.routes")(app)   // call routes and passing app object
require("./routes/category.routes")(app)




/**
 * Start the server
 */
app.listen(server_config.PORT, ()=>{
    console.log("Server has been started at port num : ", server_config.PORT);
})