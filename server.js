// Dependencies
const express = require('express');
const app = express();
const PORT = 3000;

// Routes
app.get('/', (req, res) => {
    console.log(`Get request from /, sent response.`);
    console.log(req.params);
    console.log(req.query);
    res.send('ToDo in React Express Mongoose');
});

// App Listen at the last
app.listen(PORT, () => {
    console.log(`ToDo in React Express Mongoose : I am listening on port: ${PORT}`);
});
