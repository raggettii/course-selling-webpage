const { User } = require("../db");
const {JWT_SECRET} =require("../JWT_TOKEN");
const jwt =require("jsonwebtoken");


function userMiddleware(req, res, next) {
    const authToken = req.headers.authorization;
    // since authToken includes bearer to abb use split karke usme real waal atoken nikaalna hai 
    const authTokenArrray = authToken.split(" ");
    const token =authTokenArrray[1];
    console.log("HIII")
    // abb token me aa gaya hai real JWT
    const decodedData =jwt.verify(token,JWT_SECRET)
    if(decodedData.username){
        req.username=decodedData.username;
        // this is just to store username is username if needed further in code
        next();
    }else{
        res.status(403).json({
            message:"Dude you are not authenticated"
        })
    }
}

module.exports = userMiddleware;