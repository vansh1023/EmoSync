const { Router } = require('express')
const authController = require('../controllers/auth.controller.js')
const authMiddleware = require('../middlewares/auth.middleware.js')


const authRouter = Router()





// Register user Route
// Post - /api/auth/register
authRouter.post('/register', authController.registerUserController)




// Login user Route
// Post - /api/auth/login
authRouter.post('/login', authController.loginUserController)





// Get User details Route
// Get - /api/auth/get-me
authRouter.get('/get-me', authMiddleware.authUser , authController.getMeUserController)







module.exports = authRouter