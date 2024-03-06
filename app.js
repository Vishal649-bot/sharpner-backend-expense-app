// app.js
const express = require('express');
const bodyParser = require('body-parser');
const expense = require('./module/expense');
const db = require('./utils/db');

const app = express();
const PORT = 3001;
const userroutes =  require('./controllers/user')
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/user',userroutes)
// Define routes
app.post('/expense', async (req, res) => {
    try {
        // const { itemname, Description, price, quantity } = req.body;
        // console.log(req.body);
        // console.log(itemname);

        // Create an expense record in the database
        const newExpense = await expense.create({
            itemname: req.body['Iname'],
            Description: req.body['Description'],
            price: req.body['price'],
            quantity: req.body['Quantity']
        });

        // Send the newly created expense object as the response
        res.status(201).json(newExpense);
    } catch (error) {
        console.error('Error adding expense:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        console.log(req.body);
       const itemname=req.body.Iname
       const Description =  req.body.Description
       const price = req.body.price
       const quantity = req.body.Quantity // Assuming these are the fields you want to update

        // Find the user by ID
        const user = await expense.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update user's data
        user.Itemname = itemname;
        user.description = Description;
        user.price = price-1;
        user.Quantity = quantity;

        // Save the updated user
        console.log(user)
        await user.save();

        res.json({ message: 'User updated successfully' });
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/test.html');
});


db
  .sync()
  .then(() => {
    console.log("Database synchronized successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });
