const { Admin } = require("../db");
const {JWT_SECRET} =require("../JWT_TOKEN");
const jwt =require("jsonwebtoken");

const adminMiddleware = async   (req, res, next) => {
    const authToken = req.headers.authorization;
    // since authToken includes bearer to abb use split karke usme real waal atoken nikaalna hai 
    const authTokenArray = authToken.split(" ");
    const token =authTokenArray[1];
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

module.exports = adminMiddleware;