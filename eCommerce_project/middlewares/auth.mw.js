
const user_model = require("../models/user.model")
const jwt = require("jsonwebtoken")
const auth_config = require("../configs/auth.config")

/**
 * Create a mw will check if the request body is proper and correct
 */

const verifySignUpBody =async (req, res, next)=>{

    try{
        // Check for the name
        if(!req.body.name){
            return res.status(400).send({
                message : "Failed! Name was not provided in the request body"
            })
        }

        // Check for the email
        if(!req.body.email){
            return res.status(400).send({
                message : "Failed! Email was not provided in the request body"
            })
        }
        // Check for the userId
        if(!req.body.userId){
            return res.status(400).send({
                message : "Failed! userId was not provided in the request body"
            })
        }

        // Check if the user with the same userId is already present
        const user = await user_model.findOne({userId : req.body.userId})

        if(user){
            return res.status(400).send({
                message : "Failed! user with same userId is already present"
            })
        }

        next()

    }catch(err){
        console.log("Error while validating the request object", err);
        res.status(500).send({
            message : "Error while validating the request body"
        })
    }
}

const verifySignInBody = (req, res, next)=>{

    if(!req.body.userId){
        return res.status(400).send({
            message : "userId is not provided"
        })
    }
    if(!req.body.password){
        return res.status(400).send({
            message : "password is not provided"
        })
    }

    next();
}


module.exports = {
    verifySignUpBody : verifySignUpBody,
    verifySignInBody : verifySignInBody
}