const  mongoose  = require("mongoose");
const { MongoMemoryServer } = require('mongodb-memory-server');

// async function connectDB(){
//     const mongod = await MongoMemoryServer.create();
//     mongoose.set('strictQuery', false);
//     const uri = mongod.getUri();
//     const db=await mongoose.connect(uri);
//     console.log(`Mongodb successfully connected to ${uri}`)
//     return db;
// }

async function connectDB(){
    mongoose.set('strictQuery', true);
    const db = await mongoose.connect('mongodb://127.0.0.1:27017/anpadDB')
    return db;
}


module.exports=connectDB;