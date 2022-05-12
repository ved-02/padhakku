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
app.get("/", (req, res)=>{
    res.status(200).json({
        message: "Welcome to coupon validator API",
        use: "GET request on /api/coupon/validate with json body containing couponCode i.e {couponCode: code}"
    })
})
app.use("/api/coupon", couponRoute);

app.listen(process.env.PORT || 80, (err) => {
    if (err)
        console.log(err);
    else
        console.log("App on port 80");
})