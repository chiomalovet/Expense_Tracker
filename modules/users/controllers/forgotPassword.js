const mongoose = require("mongoose");
const nodemailer= require("nodemailer");
const emailManager = require("../../../manager/emailManager");

const forgotPassword = async(request, response)=>
    {

        const userModel = mongoose.model("users");


        // deconstucting the payload
        const {email}= request.body

        if(!email) throw "Email is Required"

        const getUser = await userModel.findOne(
            {
                email:email
            })
            if(!getUser) throw "This Email Is Not In The System";


            resetCode = Math.floor(10000 + Math.random() * 90000)

            await userModel.updateOne(
                {
                    email: email
                }, {
                resetCode: resetCode
                },
                {
                    runValidators: true
                }
            );


              //sending reset code 
              
                await emailManager(email, "Password Reset", "Your Reset code is "+ resetCode,"<h1>our Reset code is "+ resetCode )

        response.status(200).json(
            {
                status: "Reset Code sent To The Email Successfully" 
            })
    }



    module.exports = forgotPassword;