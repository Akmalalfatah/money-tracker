const express = require("express")
const router = express.Router()
const ctrl = require("../controllers/expensesController")

router.get("/users/:userId/summary", ctrl.userMonthlySummary)
router.get("/", ctrl.listExpenses)
router.get("/:id", ctrl.getExpenseById)
router.post("/", ctrl.createExpense)
router.put("/:id", ctrl.updateExpense)
router.delete("/:id", ctrl.deleteExpense)

module.exports = router
