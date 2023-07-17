const express = require('express');
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express();
const connectDB = require("./database/connection.js")
const myRouter=require('./router/routes.js')

/* middleware */
app.use(express.json())
app.use(morgan("combined"))
//app.use(cors())
app.use(cookieParser());
app.disable('x-powered-by')
var corsOptions = {
    origin: true,
    credentials: true 
};

app.use(cors(corsOptions));

app.get('/',(req,res) => {
    
    res.json({name:"Hello krishna"})
})

// api routes
app.use('/api',myRouter)

/* start server when only valid connection */
const PORT=4002;
connectDB().then(() => {
    try{
        
        app.listen(PORT,function(){
            console.log(`server started at http://localhost:${PORT}`)
        })
    }catch(error){
        console.log('can not connect to the server')
    }
}).catch(err => console.log('Invalid database connection'))


