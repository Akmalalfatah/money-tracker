const db = require("../data/expenses")

function parseMonthFilter(month) {
    if (!month) return null
    const parts = month.split("-")
    if (parts.length !== 2) return null
    const year = parts[0]
    const mon = parts[1].padStart(2, "0")
    return `${year}-${mon}`
}

async function listExpenses(req, res) {
    try {
        const { userId, category, month, minAmount, maxAmount, keyword } = req.query
        let items = db.getAll()

        if (userId) items = items.filter(e => String(e.userId) === String(userId))
        if (category) items = items.filter(e => e.category === category)

        const monthPrefix = parseMonthFilter(month)
        if (monthPrefix) items = items.filter(e => e.date.startsWith(monthPrefix))

        if (minAmount) items = items.filter(e => Number(e.amount) >= Number(minAmount))
        if (maxAmount) items = items.filter(e => Number(e.amount) <= Number(maxAmount))

        if (keyword) items = items.filter(e => e.note.toLowerCase().includes(keyword.toLowerCase()))

        return res.status(200).json(items)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}


async function getExpenseById(req, res) {
    try {
        const id = Number(req.params.id)
        if (!Number.isInteger(id)) return res.status(400).json({ error: "id harus integer" })
        const item = db.getById(id)
        if (!item) return res.status(404).json({ error: "expense not found" })
        return res.status(200).json(item)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function createExpense(req, res) {
    try {
        const { userId, amount, category, note, date } = req.body
        if (!userId || !amount || !category || !date) {
            return res.status(400).json({ error: "userId, amount, category, date wajib" })
        }
        const payload = {
            userId,
            amount: Number(amount),
            category,
            note: note || "",
            date
        }
        const newItem = db.create(payload)
        return res.status(201).json(newItem)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function updateExpense(req, res) {
    try {
        const id = Number(req.params.id)
        if (!Number.isInteger(id)) return res.status(400).json({ error: "id harus integer" })
        const { amount, category, note, date } = req.body
        if (!amount && !category && !note && !date) {
            return res.status(400).json({ error: "setidaknya satu field untuk diupdate" })
        }
        const patch = {}
        if (amount !== undefined) patch.amount = Number(amount)
        if (category !== undefined) patch.category = category
        if (note !== undefined) patch.note = note
        if (date !== undefined) patch.date = date
        const updated = db.update(id, patch)
        if (!updated) return res.status(404).json({ error: "expense not found" })
        const all = db.getAll()
        return res.status(200).json({ updated, all })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}


async function deleteExpense(req, res) {
    try {
        const id = Number(req.params.id)
        if (!Number.isInteger(id)) return res.status(400).json({ error: "id harus integer" })
        const ok = db.remove(id)
        if (!ok) return res.status(404).json({ error: "expense not found" })
        return res.status(200).json({ message: "deleted" })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function userMonthlySummary(req, res) {
    try {
        const userId = req.params.userId
        const { month } = req.query
        if (!userId) return res.status(400).json({ error: "userId wajib pada path" })
        const monthPrefix = parseMonthFilter(month)
        let items = db.getAll().filter(e => String(e.userId) === String(userId))
        if (monthPrefix) items = items.filter(e => e.date.startsWith(monthPrefix))
        const total = items.reduce((s, it) => s + Number(it.amount), 0)
        const byCategory = items.reduce((acc, it) => {
            acc[it.category] = (acc[it.category] || 0) + Number(it.amount)
            return acc
        }, {})
        return res.status(200).json({ userId, month: month || null, total, byCategory, count: items.length })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

module.exports = {
    listExpenses,
    getExpenseById,
    createExpense,
    updateExpense,
    deleteExpense,
    userMonthlySummary
}
