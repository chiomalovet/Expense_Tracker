const express = require("express");
const register = require("./controllers/register");
const login = require("./controllers/login");
const userDashboard = require("./controllers/userDashboard");
const auth = require("../../middleware/auth");
const forgotPassword = require("./controllers/forgotPassword");
const resetPassword = require("./controllers/resetPassword");



const userRoutes = express.Router();
 // Routing....

 userRoutes.post("/register", register);
 userRoutes.post("/login", login);

 userRoutes.post("/forgetpassword", forgotPassword);
 userRoutes.post("/resetpassword", resetPassword);
 
 //middleware routing....
 userRoutes.use(auth);
 userRoutes.get("/dashboard", userDashboard);


module.exports = userRoutes;