const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwtManager = require("../../../manager/jwtManager");
const emailManager = require("../../../manager/emailManager");

const register = async(request, response)=> 
    {

        const userModel= mongoose.model("users");

        const {fullname, email, password, confirm_password, balance} = request.body

        // validation.....
        if(!fullname) throw "Fullname Required"
        if(!email) throw "Email Required"
        if(!password) throw "Password Required"
        if(password.length <  5) throw " Password Should be five character long"
        if(confirm_password!==password) throw "password does not match"
        if(!balance) throw "Balance Required"

        const duplicateEmail= await userModel.findOne(
            {
                email: email
            })
            if(duplicateEmail) throw "This Email already Exist"

        
     const hashedPassword = await bcrypt.hash(password, 12);

     const createdUser=  await userModel.create(
            {
              fullname: fullname,
              email: email,
              password: hashedPassword,
              balance: balance 
            })

            // creating and centralising the access token using jwt and secret key
            const accessToken = jwtManager(createdUser)


          


              //sending mail to the newly created users 
                
                await emailManager(createdUser.email, "Welcome to Expense Tracker Pro", "Welcome to Expense Tracker Pro, Hope You Enjoy Our Services and manage your expense well",
                  "<h1>Welcome to Expense Tracker Pro,<h2><br><br> Hope You Enjoy Our Services and manage your expense well"
                 )

             response.status(201).json(
                {
                    status: "Registration successfully",
                    accessToken: accessToken
                })
    }

    module.exports= register; 