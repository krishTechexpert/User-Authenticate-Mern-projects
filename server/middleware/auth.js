const jwt = require('jsonwebtoken')
const UserModel = require("../model/User.model.js");

const auth = async (req,res,next) => {
     try{
        const token = req.cookies.accessToken;
        if(!token){
            throw new Error('No token provided')
        }
        const validToken= await jwt.verify(token,process.env.ORG_SECRETS);
        const user = await UserModel.findOne({_id:validToken._id})
        if(!user){
            throw new Error('please authenticate')
        }
        req.token=token;
        req.user=user; // now we have successfully get user and passed with request further.
        next();
    }catch(err){
        res.status(401).send({error:err.message})
    }
    
}

module.exports=auth;