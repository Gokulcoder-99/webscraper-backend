const express = require('express');
const app = express();
const cors = require('cors')
const connectDb = require("./config");
const env = require('dotenv');
const router = require('./routes');
connectDb();
env.config();
app.use(cors({
    origin:"*"
}))
app.use(express.json());
app.use("/api",router)
app.listen(process.env.PORT,()=>{
    console.log(`server is listening ${process.env.PORT}`)
})