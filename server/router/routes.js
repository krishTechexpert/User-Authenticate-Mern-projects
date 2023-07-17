const express = require('express');
const auth = require('../middleware/auth')
const router = express.Router()

/* import all controller */
const {
    register,
    login,
    getUserProfile,
    getUser,
    updateUser,
    generateOTP,
    verifyOTP,
    userLogout,
    createResetSession,
    resetPassword
}= require("../controllers/appController.js");


//post methods
router.route('/register').post(register)    // for register user
router.route('/registerMail').post((req,res) => res.json('register Mail'))  // send mail
router.route('/authenticate').post((req,res) => res.json(''))               // authenticate user
router.route('/login').post(login)                      // login in app

// Get methods
router.route('/profile').get(auth,getUserProfile) // get user profile
router.route('/user/:id').get(getUser) // get user object
router.route('/generateOTP').get(generateOTP)   // generate random OTP
router.route('/verifyOTP').get(verifyOTP)     // Generated OTP verify
router.route('/createResetSession').get(createResetSession)     // Reset all the variables

// Put methods
router.route('/updateUser').put(updateUser);  // update user profile
router.route('/resetPassword').put(resetPassword); // reset password
router.route('/logout').get(auth,userLogout)

module.exports=router;