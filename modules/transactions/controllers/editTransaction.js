const mongoose = require("mongoose");

const editTransaction =async(request, response) => 
    {

        const transactionsModel = mongoose.model("transaction");

        const {transaction_id,  remarks} = request.body;

        if(!transaction_id) throw "transaction_id Cannot be Empty"
       

        const getTransactions = await transactionsModel.findOne(
            {
                _id: transaction_id
            })

            if(!getTransactions) throw " Transaction Not Found"

            await transactionsModel.updateOne(
                {
                    _id: transaction_id
                },
            
            {
                remarks,
                
            },
            {
                runValidators: true
            })


        response.status(200).json(
            {
                status: "Successfully",
                Message: " Transaction Edited"
            })
    }



    module.exports = editTransaction;