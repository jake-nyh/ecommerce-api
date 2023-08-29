const {authRegister, 
        authLogin, 
        refreshToken,
        authLogout,
        forgotPassword,
        resetPassword} = require("../controllers/authController");

const router = require("express").Router();

router.post('/register', authRegister);

router.post('/login', authLogin)

router.get('/refresh-token', refreshToken)

router.post('/logout', authLogout)

router.post('/forgot-password', forgotPassword)

router.put('/reset-password/:id/:token', resetPassword)

module.exports = router