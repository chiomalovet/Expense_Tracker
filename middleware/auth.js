const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const auth = async(request, response, next)=> 
    {
        
        try{
        // trying to get the accessToken from the header for verification process
        const accessToken= await request.headers.authorization.replace("Bearer ", "");
        

        //Trying to verify if the access token is the same one that is on the database
        const jwt_payload= await jwt.verify(accessToken, process.env.jwt_salt);
        
          // Sending this to the routes so that the user will have access to other routes after the auth route in app.js
            request.user= jwt_payload;
        }
        catch(e)
        {
           response.status(401).json(
            {
                status: " Failed",
                message: "Unauthorized"
            })
            return;
        }
    
    
        next();
    }




    module.exports = auth;