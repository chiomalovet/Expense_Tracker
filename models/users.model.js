const mongoose= require("mongoose");
 

const usersSchema = new mongoose.Schema(
    {
        fullname:
        {
            type: String,
            required: [true, "Please Provide Fullname"]
        
        },
        email:
        {
            type: String,
            required: [true, "Please Provide Email Address"],
            unique: true,
        },
        password: 
        {
            type: String,
            required: [true,  "Please Create a New Password"]
        },
        balance:
        {
             type: Number,
             required: [true,"Please Provide Balance"],
             default: 0
        },
        resetCode:
        {
            type: Number
        }
        
    },
    {
        timestamps: true
      }
)

// users is the name of the model while userSchema is the table associated with the model
const usersModel = mongoose.model("users", usersSchema)

module.exports = usersModel;