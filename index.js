const express = require('express');
const app = express();

require("dotenv").config();
const PORT = 3000;

app.use(express.json());

const blog = require("./routes/blog");

app.use("/api/v1", blog);

const coonnectWithDb = require("./config/database");
coonnectWithDb();

app.listen(PORT, ()=>{
    console.log(`App is listening at port no. ${PORT}`);
})