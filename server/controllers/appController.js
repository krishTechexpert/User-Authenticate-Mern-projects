
const UserModel = require("../model/User.model.js");
require('dotenv').config()
const { ObjectId } = require('mongodb');

/* POST: http://localhost:4000/api/register 
*/

const register = async function(req,res){
    try{
        let user=await new UserModel(req.body);
        if(user.firstName && user.lastName && user.email && user.password.length>8 && user.password !=='password' && user.gender && user.acceptConditions ){
            const emailFound = await UserModel.checkEmailAlreadyExits(user.email)
            if(emailFound){
                return  res.status(302).send({error:'email address already exits'})
            }
        }
        await user.save();
        const token= await user.generateToken();
        user.tokens=user.tokens.concat({token:token})
        await user.save();
        if(user){
            const data= {
                message:'new user registration successfully',
                success:true,
            }
            res.cookie('accessToken',token,{httpOnly:true,expires: new Date(new Date().getTime() + 60 *60 * 1000),
                sameSite: 'lax'})
                console.log(res.cookie)
            return  res.status(201).send(data)
        }
    }catch (error) {
        console.log(error)
        if (error.name === "ValidationError") {
            let errors = {};
            Object.keys(error.errors).forEach((key) => {
            errors[key] = error.errors[key].message;
            });
    
            return res.status(406).send(errors);
            }
            
        return res.status(500).send({error});
    }
}
 
/* POST: http://localhost:4000/api/login 
*/
const login= async function (req,res){
    const {email,password} = req.body;
    try{
        const User =await UserModel.findByCredential(email,password);
        const token = await User.generateToken() 
        User.password=null; // don't send to client
        User.tokens=[];
        res.cookie('accessToken',token,{httpOnly:true,expires: new Date(new Date().getTime() + 60 *60 * 1000),
            sameSite: 'lax'})
        return res.status(200).send({message:'user login successfully'})
        
    }catch(error){
        if(error.message){
            return res.status(404).send({error:error.message})
        }
        return res.status(500).send(error)
    }
}

/* GET: http://localhost:4000/api/profile */
const getUserProfile = async function(req,res){
    const{password,tokens,...rest}=req.user.toJSON(); // to get only user obj from whole mongodb object print try req.user
    //const profileObj ={user:rest,token:req.token}
   res.status(200).send(rest)
}

/* GET: http://localhost:4000/api/user/640e04bc007e41584e83d0ef
 */
const getUser= async function (req,res){
    try{
        const user=await UserModel.findById({_id:ObjectId(req.params.id)});
        if(!user){
            throw new Error('user not found')
        }
        /**remove password,token etc.  */
        /**  mongoose return unnecessary data with user object so we convert it to json to get only user object*/
        const{password,tokens,...rest}=user.toJSON();
        
        return res.status(200).send(rest)
        
    }catch(error){
        return res.status(404).send({error:error.message})
    }
    
}

/* PUT: http://localhost:4000/api/updateUser 
*/
const updateUser = async function (req,res){
    res.json('update user controler')
}

/* GET: http://localhost:4000/api/generateOTP
 */
const generateOTP = async function (req,res){
    res.json('generate OTP controler')
}

/* GET: http://localhost:4000/api/verifyOTP
 */
const verifyOTP = async function (req,res){
    res.json('verify OTP controler')
}


// successfully redirect user when OTP is valid
/* GET: http://localhost:4000/api/createResetSession

 */
const createResetSession = async function (req,res){
    res.json('createResetSession controler')
}


// update password when we have valid session
/* PUT: http://localhost:4000/api/resetPassword

 */
const resetPassword= async function (req,res){
    res.json('resetPassword controler')
}

const userLogout = async function(req,res){

    const token = req.token;
    res.clearCookie('accessToken')
    return res.status(200).send('user logout')

}

module.exports={
    register,
    login,
    getUserProfile,
    getUser,
    updateUser,
    generateOTP,
    verifyOTP,
    createResetSession,
    resetPassword,
    userLogout
}

