const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const expensesRoutes = require("./routes/expensesRoutes")

app.use(bodyParser.json())
const rateLimit = require("express-rate-limit")

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5
})

app.use(limiter)

app.use("/expenses/users", expensesRoutes) 
app.use("/expenses", require("./routes/expensesRoutes"))

app.use((req, res) => {
    res.status(404).json({ error: "endpoint not found" })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
