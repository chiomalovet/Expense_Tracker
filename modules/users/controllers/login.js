const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtManager = require("../../../manager/jwtManager");

const login = async(request, response)=>
    {

        const userModel = mongoose.model("users")

        const {email, password} = request.body

        const getUser = await userModel.findOne(
            {
                email:email
            })
             if(!getUser) throw " email does not exist!" 

             const passwordCompare = await bcrypt.compare(password, getUser.password);

             if(!passwordCompare) throw " Wrong Password";


             // creating the access token using jwt and secret key
             const accessToken = jwtManager(getUser)

           response.status(200).json(
            {
                status: "Success",
                message: " User Logged In Successfully",
                accessToken: accessToken
            })
    }

    module.exports= login;