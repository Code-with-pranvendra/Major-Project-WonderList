const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const user = require("../models/user.js");
const wrapAsync = require("../utilis/wrapAsync.js");
const passport = require("passport");
const{savedRedirectUrl}=require("../middleware.js");
const usercontroller = require ("../controllers/users.js");

router.route("/signup")
.get(usercontroller.renderSignupForm)
.post(wrapAsync(usercontroller.signup));

 
router.route("/login")
.get(usercontroller.renderLoginForm)
.post(savedRedirectUrl,passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),usercontroller.login);


router.get("/logout",usercontroller.logout)
module.exports=router;