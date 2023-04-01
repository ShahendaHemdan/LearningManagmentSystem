const router = require('express').Router();
const connection = require('../database/connection');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

router.post("/register", (req, res) => {
    const {fName,lName,email,password,confiremPassword,phone} = req.body;

    connection.query("SELECT email FROM user WHERE email= ?",[email],async(err,result)=>{
        if(err){
            console.log(err);
        }
        if(result.length>0){
            // return res.render('register',{
            //     message:"this email is already in use";
            // })

                            res.json({
                                message: "this email is already in use !"
                            })
        }else if (password!=confiremPassword){
            // return res.render('register',{
            //     message:"Passwords don't match!";
            // })

            res.json({
                message: "Passwords don't match!"
            })
        }

        let hashedPassword=await bcrypt.hash(password,10);
        connection.query("INSERT INTO `user` set ?",
        {fName:fName,lName:lName,email:email,password:hashedPassword,phone:phone,role:'student' },
        (err, result, fields) => {
            if (err) {
                result.statusCode = 500;
                res.send({
                    message: "Failed to save the account"
                })

            } else {
                res.json({
                    message: "account created !"
                })
            }
        });
    })

    

});

module.exports = router;