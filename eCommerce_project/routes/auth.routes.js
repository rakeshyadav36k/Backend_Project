/**
 * POST localhost:8080/ecomm/api/v1/auth/signup
 * POST 127.0.0.1:8080/ecomm/api/v1/auth/signup
 * 
 * I need to intercept this
 */

const authController = require("../controllers/auth.controller")
const authMW = require("../middlewares/auth.mw")

module.exports = (app)=>{
    app.post("/ecomm/api/v1/auth/signup",[authMW.verifySignUpBody], authController.signup)

    /**
     * route for
     * POST 127.0.0.1:8080/ecomm/api/v1/auth/signin
     */
    app.post("/ecomm/api/v1/auth/signin", authController.signin)
}