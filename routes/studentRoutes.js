const router = require('express').Router();
const connection = require('../database/connection');


//Post request=>Student Register courses    

router.post("/registerCourse", (req, res) => {
    const registerData = req.body;
    const {studentId,code}=req.body;
    connection.query("SELECT `id` FROM `course` WHERE ?",{code:registerData.code}, (err, courseId, fields) => {
        if (err) {
            result.statusCode = 500;
            res.send({
                message: "Failed to find the cousre"
            })

        }else{
        
        connection.query("INSERT INTO `studentcourse` set ?",
                {studentId:studentId,courseId:courseId[0].id},
                (err, result, fields) =>{
                    if (err) {
                        res.statusCode = 500;
                        res.send({
                            message: "Failed to register the cousre"
                        })

                    } else {
                        res.json({
                            message: "course registered !"
                        })
        }
    })
        }


});
    

});


//GET request=>Student Registerd courses with grades


router.get("/showCouresewithGrades/:id", async (req, res) => {
    const {id}=req.params;
    connection.query("SELECT studentcourse.studentId ,studentcourse.grade,course.code FROM `studentcourse` INNER JOIN course on course.id=studentcourse.courseId where studentId= ?",[id], (err, result, fields) => {
                if (err) {
                    res.statusCode = 500;
                    res.send({err
                        //message: "Failed to find  the student"
                    })
                    
                }
                else{
                        res.send(result)

 } })
                            })

                        
                        
 

module.exports = router;