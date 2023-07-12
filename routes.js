const express = require('express');
const router = express.Router();
const productValue = require('./model')
router.get("/product", async(req,res)=>{
    const data = await productValue.find()
    res.status(200).send({
        mess:data
    })
})

module.exports=router