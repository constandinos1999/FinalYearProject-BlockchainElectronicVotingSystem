const { Router } = require("express");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sgMail = require('@sendgrid/mail');
const randomstring = require("randomstring");

const User = require("../models/User");
const router = Router();

sgMail.setApiKey("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");

router.post("/register", async function(req, res) {
    try {
        let body = req.body;
        
        if (body.email.toLowerCase() === "blockchaincryptoevotes@gmail.com") {
            throw Error("Already existing User");
        }

        const verifyCode = randomstring.generate();
        body.verifyCode = verifyCode;
        
        await User.create(body)
        .then(async(result) => {
            const msg = {
                to: result.email,
                from: 'blockchaincryptoevotes@gmail.com', // Use the email address or domain you verified above
                subject: 'Email Verification - Blockchain E-Voting Website!',
                text: 'Please verify your account by clicking here to login',
                html: `<a href="http://localhost:5050/verify?code=${verifyCode}" target="_blank">Please Verify</a>`,
            };

            await sgMail.send(msg);
        })
        .catch(errs => {
            let messages = [];
            console.log(errs);
            Object.values(errs.errors).map(val => messages.push(val.message));
            if (messages.length) throw Error(messages[0]);
        });

        
        return res.status(200).json({
            message: "Registered successfully! Please verify and login"
        });
    } catch(err) {
        res.status(400).json({
            message: err.message
        });
    }
});

router.post("/login", async function(req, res) {
    try {
        let { email, password } = req.body;

        if (email == "blockchaincryptoevotes@gmail.com") {
            if (password == "AJVDcfuiinsoiygjnnn5678!vbjkgh!?asdAfgVs") {
                let token = JWT.sign(
                    { id: exist.id, email: exist.email, walletAddress: exist.walletAddress, isAdmin: true },
                    process.env.SALT,
                    { expiresIn: "1h" }
                );
                return res.status(200).json({
                    status: true,
                    message: "Logged in successfully!",
                    token: token
                });
            }
        }

        const exist = await User.findOne({ email });
        if (exist) {
            if (exist.isVerified) {
                throw new Error("Please verify before login");
            }
            const match = await bcrypt.compare(password, exist.password);
            if (match) {
                let token = JWT.sign(
                    { id: exist.id, email: exist.email, walletAddress: exist.walletAddress, isAdmin: false },
                    process.env.SALT,
                    { expiresIn: "1h" }
                );
                return res.status(200).json({
                    status: true,
                    message: "Logged in successfully!",
                    token: token
                });
            }
            else throw new Error("Email/Password is invalid");
        }
        else {
            return res.status(400).json({
                status: false,
                message: "Email/Password is invalid"
            });
        }
    } catch(err) {
        res.status(400).json({
            message: err.message
        });
    }
});

router.get("/accessResource", function(req, res) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            res.status(400).json({
                message: "Error! Token was not provided."
            });
        }

        const decodedToken = JWT.verify(token, process.env.SALT);
        res.status(200).json({
            success:true,
            data: decodedToken
        });
    } catch(err) {
        res.status(400).json({
            message: err.message
        });
    }
});

router.get("/fetch-voters", async function (req, res) {
    try {
        const voters = await User.find();
        return res.status(200).json({
            voters
        });
    } catch(err) {
        res.status(200).json({
            voters: []
        });
    }
});

router.get("/verify", async function (req, res) {
    try {
        const { code } = req.query;
        console.log(code)
        let voter = await User.findOne({ verifyCode: code });
        if (voter) {
            await User.findOneAndUpdate({ verifyCode: code }, { isVerified: true, verifyCode : "" });
            res.send("Verified successfully! Please login")
        }
    } catch(err) {
        res.status(400).json({
            message: err.message
        });
    }
});

module.exports = router;