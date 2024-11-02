const express = require("express");

const auth = require("../../middleware/auth");
const addIncome = require("./controllers/addIncome");
const addExpense = require("./controllers/addExpense");
const getTransactions = require("./controllers/getTransactions");
const deleteTransactions = require("./controllers/deleteTransactions");
const editTransaction = require("./controllers/editTransaction");


const transactionRoutes = express.Router();

// Routing.....
transactionRoutes.use(auth);


//protected Routes

transactionRoutes.post("/addIncome", addIncome)
transactionRoutes.post("/addExpense", addExpense)
transactionRoutes.get("/", getTransactions)
transactionRoutes.delete("/:transaction_id", deleteTransactions)
transactionRoutes.patch("/", editTransaction)
    

    module.exports= transactionRoutes;