const router = require('express').Router();
const connection = require('../database/connection');


//get enrolled students
router.get("/enrolledStudents/:id/:code", (req, res) => {
    const {id,code}=req.params;
    connection.query("SELECT `id`as courseId FROM `course` WHERE ? ",{code:code}, (err, result, fields) => {
        if(err){
            res.send(err)
        }else{ 
                connection.query("SELECT studentId , grade FROM `studentcourse` WHERE ?",{courseId:result[0].courseId}, (err, result, fields) => {
                    if(err){
                        res.send(err)
                    }else{ 
                    res.send(result)
                    }
                })
        }
    });
});

//Set Grades for students for each course.

router.post("/setGrade", (req, res) => {
    const {studentId,courseCode,grade} = req.body;
    console.log(courseCode)
    connection.query("SELECT  `id` FROM `course` WHERE `code`=?",[courseCode],(err, result, fields) => {
        if(err){
            res.statusCode = 500;
            res.send(err)
        }else{
            const courseId=result[0].id
            connection.query("Update studentcourse set? where studentId= ? and courseId=?",
            [{grade:grade},studentId,courseId],(err, savedGrade, fields) => {
            if (err) {
                res.statusCode = 500;
                res.send({
                    message: "incorect data"
                })

            } else {
                res.json({
                    message: "grade saved !"
                })
            }
        })
        }
    })
    

});

module.exports = router;