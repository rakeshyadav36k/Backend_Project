const category_model = require("../models/category.model")

/**
 * Controller for creating the category
 * 
 * 
 *  POST 127.0.0.1:8080/ecomm/api/v1/categories
 * 
 */

exports.createNewCategory = async (req, res)=>{
    // Read the req body

    // Create the category object
    const cat_data = {
        name : req.body.name,
        description : req.body.description
    }

    try{
        // Insert into mongodb
        const category = await category_model.create(cat_data)
        return res.status(201).send(category)
    }catch(err){
        console.log("Error while creating the category")
        return res.status(500).send({
            message : "Error while creating the category"
        })
    }
    
    // return the response of the created category
}
