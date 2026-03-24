const { Router } = require('express')
const authController = require('../controllers/auth.controller.js')


const authRouter = Router()





// Register user Route
// Post - /api/auth/register
authRouter.post('/register', authController.registerUserController)



// Login user Route
// Post - /api/auth/login
authRouter.post('/login', authController.loginUserController)







module.exports = authRouter