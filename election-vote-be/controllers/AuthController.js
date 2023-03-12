const { Router } = require("express");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const randomstring = require("randomstring");

const User = require("../models/User");
const router = Router();

router.post("/register", async function(req, res) {
    try {
        let body = req.body;
        // const exist = await User.findOne({ email: body.email });
        // if (exist) {
        //     throw Error("Already existing voter");
        // }
        
        const verifyCode = randomstring.generate();
        body.verifyCode = verifyCode;
        
        await User.create(body).catch(errs => {
            let messages = [];
            console.log(errs);
            Object.values(errs.errors).map(val => messages.push(val.message));
            if (messages.length) throw Error(messages[0]);
        });
        
        return res.status(200).json({
            message: "Registered successfully! Please verify and login"
        });
    } catch(err) {
        console.log(err);
        res.status(400).json({
            message: err.message
        });
    }
});

router.post("/login", async function(req, res) {
    try {
        let { email, password } = req.body;
        const exist = await User.findOne({ email });
        if (exist) {
            const match = await bcrypt.compare(password, exist.password);
            if (match) {
                let token = JWT.sign(
                    { id: exist.id, email: exist.email },
                    process.env.SALT,
                    { expiresIn: "1h" }
                );
                return res.status(200).json({
                    status: true,
                    message: "Logged in successfully!",
                    token: token
                });
            }
            else throw new Error("Email/Password is invalid1");
        }
        else {
            return res.status(400).json({
                status: false,
                message: "Email/Password is invalid2"
            });
        }
    } catch(err) {
        res.status(400).json({
            message: err.message
        });
    }
});

router.get("/accessResource", function(req, res) {
    const token = req.headers.authorization.split('')[1];
    if (!token) {
        res.status(400).json({
            message: "Error! Token was not provided."
        });
    }

    const decodedToken = JWT.verify(token, process.env.SALT);
    res.status(200).json({
        success:true,
        data:{
            userId:decodedToken.userId,
            email:decodedToken.email
        }
    });
});

module.exports = router;