require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const couponRoute = require("./routes/coupon");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Database
dbConnect().catch(err => console.log(err));

async function dbConnect() {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to db")
}

// routes
app.use("/api/coupon", couponRoute);

app.listen(80, (err) => {
    if (err)
        console.log(err);
    else
        console.log("App on port 80");
})