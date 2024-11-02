const mongoose = require("mongoose");


const getTransactions = async(request, response)=>
    {
        const transactionsModel = mongoose.model("transactions");

        const allTransactions =await transactionsModel.find(
            {
                user_id: request.user._id,
                ...request.query
            })

        response.status(200).json(
            {
                status: "Successful",
                message: allTransactions
            })
    }


    module.exports= getTransactions;