const mongoose = require('mongoose');

const dbString = `mongodb+srv://shruti31:sZ5OGoe6qtMYiIDx@cluster0.gi7dc.mongodb.net/BMS?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(dbString);
const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
connection.on('connected', function() {
    console.log('Connected to MongoDB');
});

module.exports = connection;
