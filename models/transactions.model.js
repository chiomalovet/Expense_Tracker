const mongoose= require("mongoose");

 

const transactionsSchema = new mongoose.Schema(
    {
       user_id:
       {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
       },

       amount:
       {
        type: Number,
        required: true,
       },

       transaction_type:
       {
        type: String,
        required: true,
        enum: ["income", "expense"],
       },

       remarks:
       {
        type: String,
        required: true
       }
    },

    {
        timestamps: true
      }
)

// users is the name of the model while userSchema is the table associated with the model
const transactionsModel = mongoose.model("transactions", transactionsSchema)

module.exports = transactionsModel;