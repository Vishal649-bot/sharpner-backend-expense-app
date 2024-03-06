const express = require('express')
    router = express.Router()

const db = require('../module/expense')

router.get('/',(req,res)=>{
    db.findAll()
    .then(expense =>{
        console.log(expense);
        res.json(expense)
    })
    .catch(err => {
        console.log(err);
    })
})
// Route to fetch a user by ID
router.get('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await db.findByPk(userId); // Assuming 'id' is the primary key in your 'users' table

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ error: 'Server error' });
    }
});




router.delete('/:id', (req, res) => {
    const expenseId = req.params.id;

    // Find the expense by ID and delete it
    db.findByPk(expenseId)
        .then(expense => {
            if (!expense) {
                return res.status(404).json({ error: 'Expense not found' });
            }

            // Delete the expense
            return expense.destroy();
        })
        .then(() => {
            res.json({ message: 'Expense deleted successfully' });
        })
        .catch(err => {
            console.error('Error deleting expense:', err);
            res.status(500).json({ error: 'Server error' });
        });
});


module.exports = router