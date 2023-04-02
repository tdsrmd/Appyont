const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");
const { AUTHORIZATION, MANAGERAUTHORIZATION } = require("../middlewares/access");
const schemas = require("../schemas/expenseSchema");
const validate = require("../middlewares/validate");

router.post("/newExpense", MANAGERAUTHORIZATION, validate(schemas.newExpense), expenseController.newExpense);
router.get("/listExpenses", AUTHORIZATION, expenseController.listExpenses);
router.delete("/deleteExpense/:id", MANAGERAUTHORIZATION, expenseController.deleteExpense);

module.exports = router;
