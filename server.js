const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user.routes');
const db_connection = require('./config/db.config');
const app = express();

app.use(bodyParser.json());
app.use(userRouter);

app.listen(3000, async ()=>{
    console.log("server listening on port 3000")
    await db_connection();
})