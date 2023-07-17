const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,'enter first name'],
        trim:true
    },
    lastName:{
        type:String,
        required:[true,'enter last name'],
        trim:true
    },
    email:{
        type:String,
        required:[true,'enter email address'],
        unique:true,
        trim:true,
        lowercase:true,
        validate(values){
            if(!validator.isEmail(values)){
                throw new Error('Invalid Email address')
            }
        }
    },
    gender:{
        type:String,
        enum:['Male','Female'],
        required:[true,'select your gender']
    },
    password:{
        type: String,
        required: [true,'enter password'],
        trim: true,
        minlength:[8,'password is too short'],
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('password does not contain password')
            }
        }
    },
    // confirmPassword:{
    //     type: String,
    //     required: [true,'enter confirm password'],
    //     trim: true
    // },
    acceptConditions:{
        type:Boolean,
        required:true,
        trim:true,
        validate(value){
            if(!value){
                throw new Error('accept terms and condition')
            }
        }
    },
    // // we used to token as array if user craete registeration using different client like mobile,computer,etc.
    tokens:[{
        token:{
            type:'string',
            required:true
        }
    }]
},
{
    timestamps:true
})


//  to generate token
UserSchema.methods.generateToken = async function() {
    // here this represents our user object
    const token = await jwt.sign({
        _id:this._id
    },process.env.ORG_SECRETS,{expiresIn:'24h'});
    return token;
}

// to check email address already exits at sign up
UserSchema.statics.checkEmailAlreadyExits = async(emailAddress) => {
    const emailFound =  await UserModel.findOne({email:emailAddress})
    if(emailFound){
        return emailFound;
    }
    return null
}

// static method to check valid user credential at login time
UserSchema.statics.findByCredential = async (email,password) => {
   try{
        const user =  await UserModel.findOne({email})
        if(!user){
            throw new Error('Email does not exits!')
        }
        const ismatch = await bcrypt.compare(password, user.password)
        if(!ismatch){
            throw new Error('Password not matched')
        }
        return user
    }catch(error){
        throw new Error(error.message)
    }
}

UserSchema.pre('save',async function(next){
    const user=this;
    console.log('just before saving...')
    // only hash the password if it has been modified (or is new)
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,10)
     }
    next();
})



const UserModel=mongoose.model('User',UserSchema);
module.exports=UserModel;