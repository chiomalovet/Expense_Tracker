const mongoose = require("mongoose");

const deleteTransactions = async(request, response) => 
    {
        const transactionsModel = mongoose.model("transactions");
        const usersModel = monngose.model("users");

        const {transaction_id}= request.param

        const getTransactions = await transactionsModel.findOne(
            {
                _id: transaction_id
            })

            if(!getTransactions) throw " Transaction Not Found"

            

                if(getTransactions.transaction_type ==="income")
                    {
                        // income logic

                    await usersModel.updateOne(
                        {
                            _id: getTransactions.user_id
                        },
                        {
                            $inc: 
                            {
                                balance: getTransactions.amount * -1
                            }
                        },
                        {
                            runValidators: true
                        })

                    }else
                    {
                        // expense logic
                        
                    await usersModel.updateOne(
                        {
                            _id: getTransactions.user_id
                        },
                        {
                            $inc: 
                            {
                                balance: getTransactions.amount 
                            }
                        },
                        {
                            runValidators: true
                        })
                    }

                    await transactionsModel.deleteOne(
                        {
                            _id: transaction_id
                        })

                    


        response.status(200).json(
            {
                status: "Successful",
                message: "Transactions Deleted successfully"
            })
    } 

    module.exports = deleteTransactions