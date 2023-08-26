const mongoose = require('mongoose');
const dburl = "mongodb+srv://rajeshkotha232:ODVjF8olBV85HCqM@cluster0.7fr5jcc.mongodb.net/"


const db_connection = async (req, res) => {
    console.log("inside db connection")
    await mongoose.connect(dburl);
    console.log("database connection established");
}

module.exports =db_connection;