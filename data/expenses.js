const expenses = [
    {
        id: 1,
        userId: 101,
        amount: 50000,
        category: "food",
        note: "sarapan nasi goreng",
        date: "2025-11-01"
    },
    {
        id: 2,
        userId: 101,
        amount: 75000,
        category: "transport",
        note: "ojek",
        date: "2025-11-02"
    },
    {
        id: 3,
        userId: 102,
        amount: 120000,
        category: "groceries",
        note: "belanja mingguan",
        date: "2025-11-05"
    }
]

let nextId = 4

function getAll() {
    return expenses
}

function getById(id) {
    return expenses.find(e => e.id === id) || null
}

function create(expense) {
    const newExp = { id: nextId++, ...expense }
    expenses.push(newExp)
    return newExp
}

function update(id, patch) {
    const idx = expenses.findIndex(e => e.id === id)
    if (idx === -1) return null
    expenses[idx] = { ...expenses[idx], ...patch, id }
    return expenses[idx]
}

function remove(id) {
    const idx = expenses.findIndex(e => e.id === id)
    if (idx === -1) return false
    expenses.splice(idx, 1)
    return true
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}
