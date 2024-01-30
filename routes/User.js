const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const { default: mongoose } = require("mongoose");
const jwt =require("jsonwebtoken");
const {JWT_SECRET} =require("../JWT_TOKEN");



router.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.create({
        username, 
        password
    })
    res.json({
        message: "User created successfully"
    })
});

router.post('/signin',async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.find({
        username:username,
        password:password
    })
    if(user){
        // create token
        const token =jwt.sign({username},JWT_SECRET);

        res.json({
            token:token
        })
    }
    else{
        res.status(411).json({
            message: "Incorrect email and pass"
        })
    }
})



router.get('/courses', async (req, res) => {
     const response = await Course.find({});

     res.json({
         courses: response
     })
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    const courseId = req.params.courseId;
    console.log("HELLOOO")
    await User.updateOne({
        username: username
    }, {
        "$push": {
            purchasedCourses: courseId
        }
    })
    res.json({
        message: "Purchase complete!"
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    const user = await User.findOne({
        username: req.headers.username
    });

    console.log(user.purchasedCourses);
    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    });

    res.json({
        courses: courses
    })
});

module.exports = router