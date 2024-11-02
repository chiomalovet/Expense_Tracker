const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const emailManager = require("../../../manager/emailManager");


const resetPassword =async(request, response) => 
    {
        const usersModel = mongoose.model("users");

        const {email, resetCode, newPassword}=request.body;

        if(!email) throw "Email is Required"
        if(!resetCode) throw "Reset Code is Required"
        if(!newPassword) throw "Password is Required"
        if(newPassword.length < 5) throw "Password should be 5 Character Long"

        const getUser = await usersModel.findOne(
            {
                email: email,
                resetCode: resetCode
            })

        if(!getUser) throw "Email and Reset Code is Wrong"
        
        const hashedPassword = await bcrypt.hash(newPassword, 12);


        await usersModel.updateOne(
            {
                email : email
            },
            {
                password: hashedPassword,
                resetCode: "",
            },
            {
                runValidators: true
            }
        )
    
                await emailManager(email, "PassWord Reset", "Password Reset Was Successful",
                    "<h1> Password Reset Was Successful"
                )


        response.status(200).json(
            {
                status: "Successfully",
                message: "Password Reset successfully"
            })
    }





    module.exports = resetPassword;