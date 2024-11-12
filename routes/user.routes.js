const express = require('express')
const router = express.Router()
const { body,validationResult } = require('express-validator')
const userModel = require('../models/user.models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.get('/register',(req,res)=>{
    res.render('register')
})
router.post('/register',

    body('email').trim().isEmail().isLength({min:13}),
    body('password').trim().isLength({min:6}),
    body('username').trim().isLength({min:5}),

    async (req,res)=>{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'invalid data!!'
            })
        }

        const {email,username,password} = req.body
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await userModel.create({
            username,
            email,
            password:hashPassword
        })
        res.json(newUser)
})
router.get('/login',(req,res)=>{
    res.render('login')
})
router.post('/login',

    body('email').trim().isEmail().isLength({min:13}),
    body('password').trim().isLength({min:6}),

    async (req,res)=>{

        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return express.response.status(400).json({
                errors:errors.array(),
                message:'invalid data!'
            })
        }

        const {email,password} = req.body
        const user = await userModel.findOne({
            email:email
        })
        if(!user){
            return res.status(400).json({
                message: 'email or password is incorrect'
            })
        }
        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(400).json({
                message:'email or password is incorrect'
            })
        }


        const token = jwt.sign({
            userId:user._id,
            email:user.email,
            username:user.username
        },
            process.env.JWT_SECRET,
        )
        res.cookie('token',token)
        res.send('logged in')

    }
)

module.exports = router