require('dotenv').config();
const cors = require('cors');
const express=require('express');
const connectDB=require('./config/dbconnection');
const userRoutes=require('./routes/userRoutes');
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());


connectDB();
app.use("/",userRoutes);

module.exports=app;