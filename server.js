// Dependencies
const express = require('express')
const mongoose = require('mongoose')
const app = express();

app.use(express.json());

// Environment Variables (getting ready for Heroku)
const PORT = process.env.PORT || 3000;

// Routes
const todosController = require('./controllers/todos.js');
app.use('/todos', todosController);

const db = mongoose.connection;

// Environment Variables
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://dbLina:jBdf48k6DlIEp3ZK@clstrlin001-ldhm1.mongodb.net/todo?retryWrites=true&w=majority'

// Connect to Mongo
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('MongoDB connection established:', mongoURI)
)

// Error / Disconnection
db.on('error', err => console.log(err.message + ' is Mongod not running?'));
db.on('disconnected', () => console.log('mongo disconnected'));

// App Listen at the last
app.listen(PORT, () => {
    console.log(`ToDo in React Express Mongoose : I am listening on port: ${PORT}`);
});
