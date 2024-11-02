require("express-async-errors");

const express = require("express");
const cors = require("cors");
const errorHandler = require("./handlers/errorHandler");
const mongoose = require("mongoose");
const userRoutes = require("./modules/users/users.routes");
const transactionRoutes = require("./modules/transactions/transactions.routes");

require("dotenv").config();
const app = express()
app.use(cors());

mongoose.connect(process.env.mongo_connect, {}).then(()=>
    {
        console.log("Database Connected successfully");
    }).catch((error)=>
        {
           console.log("Database Not Connected", error.message || error)
        })

app.use(express.json());


// models initiallising
require("./models/users.model");
require("./models/transactions.model");


// Routes.....
app.use("/api/users/", userRoutes);
app.use("/api/transactions", transactionRoutes);

// end of routing
app.all("*", (request, response, next)=> 
    {
        response.status(404).json(
            {
                status: "Failed",
                message: "Page Not Found"
            })
    })
// this is for the error handler
app.use(errorHandler);

app.listen(8000, ()=>
    {
        console.log("Server Started Succesfully")
    })