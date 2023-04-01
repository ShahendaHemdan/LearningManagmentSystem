const router = require('express').Router();
// const adminAuth = require('../middleware/admin');
const connection = require('../database/connection');
const bcrypt=require('bcryptjs');


//get all admins
router.get("/", (req, res) => {
    connection.query("SELECT * FROM `user` WHERE role= ? ",['admin'], (err, result, fields) => {
        res.send(result);
    });
});


                        // CRUD on COURSE 


 //get all courses
router.get("/allCourses", (req, res) => {
    connection.query("SELECT * FROM `course`", (err, result, fields) => {
        if (err) {
            res.statusCode = 500;
            res.send({
                message: "Failed to save the cousre"
            })

        }else{
        res.send(result);
        }
    });
});
// Post request => save a course
router.post("/addCourse", (req, res) => {
    const courseData = req.body;

    connection.query("INSERT INTO `course` set ?",
        { name: courseData.name, code: courseData.code,status:courseData.status },
        (err, result, fields) => {
            if (err) {
                res.statusCode = 500;
                res.send({
                    message: "Failed to save the cousre"
                })

            } else {
                res.json({
                    message: "course created !"
                })
            }
        });

});

// Get request => get a specific course
router.get("/showCourse/:id", (req, res) => {
    const { id } = req.params;
    connection.query("select * from course where ?", { id: id }, (err, result, fields) => {
        if (result[0]) {
            res.json(result[0]);
        } else {
            res.statusCode = 404;
            res.json({
                message: "course not found",
            });
        }
    });
});


// Put request => modify a specific movie
router.put("/updateCourse/:id", (req, res) => {
    const { id } = req.params;
    const courseData = req.body;
    connection.query("update course set ? where id = ?",
        [{ name: courseData.name, code: courseData.code,status:courseData.status }, id], (err, result) => {
            if (err) {
                res.statusCode = 505;
                res.json({
                    message: "Failed to update the course"
                });
            } else {
                res.json({
                    message: "course updated successfully"
                });
            }
        });
});

// Delete request => delete a course
router.delete("/deleteCourse/:id", (req, res) => {
    const { id } = req.params;
    connection.query("delete from course where ?", { id: id }, (err, result) => {
        if (err) {
            res.statusCode = 500;
            res.json({
                message: "failed to delete the course",
            });
        }
        res.json({
            message: "course deleted successfully"
        })
    });
});




                        // CRUD on INSTRUCTOR 


    //get all instrctors
    router.get("/allInstrctors", (req, res) => {
        connection.query("SELECT * FROM `user` where role= ?", ['instructor'],(err, result, fields) => {
            res.send(result);
        });
    });

// Post request => save an instrctor
router.post("/addInstrctor", async(req, res) => {
    const instructoreData = req.body;
    let hashedPassword=await bcrypt.hash(instructoreData.password,10);
    connection.query("INSERT INTO user set ?",
        {
            fName: instructoreData.fName,lName: instructoreData.lName,
            email:instructoreData.email ,password:hashedPassword,
            phone:instructoreData.phone,status:instructoreData.status,
            role:'instructor'
        },
        (err, result, fields) => {
            if (err) {
                res.statusCode = 500;
                res.send({
                    message: "Failed to save the Instrctor"
                })

            } else {
                res.json({
                    message: "Instrctor created !"
                })
            }
        });

    });

// Get request => get a specific course
router.get("/showInstructor/:id", (req, res) => {
    const { id } = req.params;
    connection.query("select * from user where id=? and role=?", [id,'instructor'], (err, result, fields) => {
        if (result[0]) {
            res.json(result[0]);
        } else {
            res.statusCode = 404;
            res.json({
                message: "instructor not found",
            });
        }
    });
});
  // Put request => modify a specific instrctor

    router.put("/updateInstrctor/:id", (req, res) => {
    const { id } = req.params;
    const instructoreData = req.body;
    connection.query("update user set ? where id = ?",
        [ {
            fName: instructoreData.fName,lName: instructoreData.lName,
            email:instructoreData.email ,password: instructoreData.password,
            phone:instructoreData.phone,status:instructoreData.status,
            role:'instructor'
        }, id], (err, result) => {
            if (err) {
                res.statusCode = 505;
                res.json({
                    message: "Failed to update the Instrctor"
                });
            } else {
                res.json({
                    message: "Instrctor updated successfully"
                });
            }
        });
    });

// Delete request => delete a instrctor
router.delete("/deleteInstrctor/:id", (req, res) => {
    const { id } = req.params;
    connection.query("delete from user where id= ? AND role= ?", [id,'instructor'], (err, result) => {
        if (err) {
            res.statusCode = 500;
            res.json({
                message: "failed to delete the Instrctor",
            });
        }
        res.json({
            message: "Instrctor deleted successfully"
        })
    });
});


            //Assign Instructors to Courses

router.post("/assignInstrctor", (req, res) => {
    const instructoreData = req.body;
  
                connection.query("INSERT INTO instructorcourse set ?",
                    {
                        userId: instructoreData.userId,courseId: instructoreData.courseId,
                    },
                (err, result, fields) => {
                    if (err) {
                        res.statusCode = 500;
                        res.send({
                            message: "Failed to assigne to course"
                        })

            } else {
                res.json({
                    message: "Instrctor assigned to course !"
                })
            }
        });

    
    });

module.exports = router;