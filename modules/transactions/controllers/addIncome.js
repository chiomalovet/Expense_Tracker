const mongoose = require("mongoose");
const validator = require("validator")

const addIncome = async(request, response)=>
    {

        const userModel = mongoose.model("users");
        const transactionsModel = mongoose.model("transactions");

        const{amount, remarks}= request.body

        // validation...
        if(!amount) throw "Amount Required";
        if(!remarks) throw " Remarks Required";
        if(remarks.length < 5 ) throw " Remarks should be at least 5 characters long!";

        if(!validator.isNumeric((amount.toString()))) throw "Amount Must Be a Number";
         if(amount < 0) throw "Amount Should Not Be Negative"

        await transactionsModel.create(
            {
               user_id: request.user._id,
                amount: amount,
                remarks: remarks,
                transaction_type: "income",
            })

            await userModel.updateOne(
                {
                    _id: request.user._id
                },
                {
                    //updating the bal in the db with the current bal
                $inc:
                {
                    balance: amount
                },
             },
             {
                runValidators: true
             }
            )


        response.status(200).json(
            {
                status: "Successful",
                message: "Income Added successfully"
            })
    }


    module.exports= addIncome;