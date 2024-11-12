const express = require('express')
const app = express()
const userRouter = require('./routes/user.routes')
const dotenv = require('dotenv')
const connectToDb = require('./config/db')
dotenv.config()
connectToDb()
const cookieParser = require('cookie-parser')


app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/user',userRouter)

app.listen(3000,()=>{
    console.log('server is running on port 3000');
})