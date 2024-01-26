require('dotenv').config();
const express=require('express');
const app=express();
const cors=require('cors');
const userroutes=require("./routes/users");
const authroutes=require("./routes/auth");


const connection=require("./db");
connection();
app.use(cors());
app.use(express.json());

app.use("/api/users",userroutes);
app.use("/api/auth",authroutes);















  const port=process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`Listen on ${port}`);
})