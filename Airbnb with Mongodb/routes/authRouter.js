const express = require('express')
const authRouter = express.Router();

const {getLogin,postLogin,getLogout,getSignup,postSignup,getpassword,postpassword} = require('../controller/authController');

authRouter.get('/login',getLogin);
authRouter.post('/login',postLogin);
authRouter.get('/logout',getLogout);
authRouter.get('/signup',getSignup)
authRouter.post('/signup',postSignup)
authRouter.get('/password',getpassword)
authRouter.post('/password',postpassword)

module.exports = authRouter;