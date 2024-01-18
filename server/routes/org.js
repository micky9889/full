const express = require("express");
const router = express.Router();

// localhost:8000/api/regiter
router.get('/create-org',(req,res)=>{
    res.send("hello create-org endpoint")
})

// localhost:8000/api/test
router.get('/update-org',(req,res)=>{
res.send("hello update-org endpoint")
})

module.exports=router