const mongoose = require("mongoose");
const transactionsModel = require("../../../models/transactions.model");


const userDashboard = async(request, response)=> 
    {
        const userModel = mongoose.model("users");
        const transactionsModel= mongoose.model("transactions")

        const getUser = await userModel.findOne(
            {
                //comparing the accesstoken and the getting the user info
                _id: request.user._id
            }).select("-password")

            const transactions = await transactionsModel.find(
                {
                    user_id: request.user._id  
                }).sort("-createdAt").limit(5);



        response.status(200).json(
            {
                status: " successful",
                message: getUser,
                transactions,
            })
    }




    module.exports = userDashboard;