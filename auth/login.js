const router = require('express').Router();
const app = require('express');
const connection = require('../database/connection');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const session=require('express-session');


router.post("/login", (req, res) => {
    const {email,password} = req.body;

    connection.query("SELECT * FROM user WHERE email= ?",[email],async(err,result)=>{
        
        

        if(err){
            console.log(err);
        }

        
        if(result[0].email==null){
            // return res.render('register',{
            //     message:"There is no email matches, please regester first!";
            // })

                            res.json({
                                message: "There is no email matches, please regester first!"
                            })}

        else{ await bcrypt.compare(password,result[0].password, function(err, hash) {
            if (err) { throw (err); }
        // 
        else if(!hash){
            // return res.render('login',{
            //     message:"Password doesn't match!";
            // })

            res.json({
                message: "Password doesn't match!"
            })
        }else if(result[0].role=='student'){
        
            res.send({
                message: "Student Side"
            })
        }else if(result[0].role=='instructor'){
            res.send({
                message: "instructor Side"
            })
        }
        else{
            res.send({
                message: "admin Side"
            })
        }
        
    });
        }
         });
        });
   

module.exports = router;