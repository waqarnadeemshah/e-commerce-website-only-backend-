const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { check, validationResult } = require("express-validator");
const { user } = require('../models/user');


exports.signup = [
    check('name')
        .trim()
        .isLength({ min: 2 })
        .withMessage("first name should be 2 lenght longer")
        .matches(/^[A-Za-z\s]+$/)
        .withMessage("name contains alphabets only !!!"),

    check('email')
        .isEmail()
        .withMessage("Please enter the email")
        .normalizeEmail(),

    check('password')
        .isLength({ min: 6 })
        .withMessage('Password length should be atleast 6 longer')
        .matches(/^[A-Za-z0-9\s]+$/)

, async (req, res) => {
    try {
        const { name, email, password,role } = req.body;
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(401).json({ errors: error.array() })
        }

        const existemail = await user.findOne({ email })
        if (existemail) {
            return res.status(401).json({ msg: "already email is exist " })
        }
        const passhashed = await bcrypt.hash(password, 10)
        const userdata = new user({
            name, email, password: passhashed, role
        })
        await userdata.save()
        res.status(201).json({ msg: "data inserted sucessfully", sucess: true })


    }
    catch (err) {
        res.status(500).json({ msg: "Sorry ! internal error while creating user", error: err, sucess: false })
    }
}]
const generateAccessToken = (user) => {
    return jwt.sign({ _id: user._id, role: user.role, name: user.name }, process.env.ACCESSTOKEN, { expiresIn: '1h' })
}
const generateRefreshToken = (user) => {
    return jwt.sign({ _id: user._id }, process.env.REFRESSTOKEN, { expiresIn: '7days' })
}
exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;
        const founduser = await user.findOne({ email })
        if (!founduser) {
            return res.status(401).json({ msg: "user not found" });
        }
        const passcheck = await bcrypt.compare(password, founduser.password)
        if (!passcheck) {
            return res.status(401).json({ msg: "password is incorrect " });
        }
        const acesstoken = generateAccessToken(founduser);
        const refreshtoken = generateRefreshToken(founduser);
        founduser.refreshtoken = refreshtoken;
        await founduser.save();
        res.cookie('refreshtoken', refreshtoken, {
            httpOnly: true,
            secure: true
        })
        res.status(200).json({ msg: "login sucessfully", acesstoken, user: { _id: founduser._id, role: founduser.role, name: founduser.name } })

    } catch (error) {

        res.status(500).json({ msg: 'Login failed' });
    }
}
exports.regeneraterefreshtoken = async (req, res) => {
    try {
        const token = req.cookies.refreshtoken;
        if (!token) {
            return res.status(401).json({ msg: "refress token is missing" })
        }
        const decode = jwt.verify(token, process.env.REFRESSTOKEN)
        const user = await user.findOne({ _id: decode._id })
        if (!user) {
            return res.status(401).json({ msg: "refress token is missing" })
        }
        const newRefreshtoken = generateRefreshToken(user)
        const newAccessToken = generateAccessToken(user);
        user.refreshtoken = newRefreshtoken;
        await user.save();
        res.cookie('refreshtoken', newRefreshtoken, {
            httpOnly: true,
            secure: true
        })
        res.status(200).json({
            accessToken: newAccessToken,
            user: {
                id: user._id,
                username: user.username,
                role: user.role,
            }
        })


    } catch (error) {
        res.status(400).json({ msg: 'Token expired or invalid' });
    }
}
exports.logout = async (req, res) => {
    try {
        const token = req.cookie.refreshtoken;
        if (token) {
            const user = await user.findOne({ refreshtoken: token })
            if (user) {
                user.refreshtoken = null;
                await user.save();
            }

        }
        res.clearCookie('refreshtoken');
        res.status(201).json({ msg: "loggout sucessfully" })

    }
    catch (err) {
        res.status(500).json({ msg: "logout error" })
    }
}
