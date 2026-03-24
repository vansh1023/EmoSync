const express = require('express')
const userModel = require('../models/user.model.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')





// Register User Controller
async function registerUserController(req, res){

    const { username, email, password } = req.body

    const isAlreadyRegistered = await userModel.findOne({
        $or: [
            {email},
            {password}
        ]
    })

    if(isAlreadyRegistered){
        return res.status(409).json({
            message: "User with the same email or username already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hashedPassword
    })

    const token = jwt.sign({
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    )

    res.cookie("token", token)

    return res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username,
            email
        }
    })
}






// Login User Controller
async function loginUserController(req, res) {

    const { username, email, password } = req.body

    const user = await userModel.findOne({
        $or: [
            {email},
            {password}
        ]
    }) 

    if(!user){
        return res.status(401).json({
            message: "Invalid Creadentials"
        })
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if(!isValidPassword){
        return res.status(401).json({
            message: "Invalid Credentials"
        })
    }

    const token = jwt.sign({
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    )

    res.cookie("token", token)

    return res.status(200).json({
        message: "User logged In successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}





module.exports = {
    registerUserController,
    loginUserController
}