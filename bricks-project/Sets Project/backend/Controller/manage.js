const express = require("express");
const router = express.Router();
require("dotenv").config();
const multer = require("multer");
const jwt = require('jsonwebtoken');
require("dotenv").config();
const UPLOAD_FOLDER = "./public/image";
const fs = require("fs");
const path = require("path");
const User = require("../Schema/userSchema");
const bcrypt = require('bcrypt');
const Review = require("../Schema/review");



//! -----------multer for image upload------------
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_FOLDER);
    },
    filename: (req, file, cb) => {
        if (file) {
            const fileExt = path.extname(file.originalname);
            const fileName =
                file.originalname
                    .replace(fileExt, "")
                    .toLowerCase()
                    .split(" ")
                    .join("-") +
                "-" +
                Date.now();
            // console.log("🚀 ~ fileName:", fileName);
            cb(null, fileName + fileExt);
        }
    },
});

var upload = multer({
    storage: storage,
});


//!----------- registration route-------------
router.post('/resgistration', upload.single("image"), async (req, res) => {
    try {
        // console.log('body', req.body);
        const { name, email, password } = req.body;
        console.log(name, email, password);
        const useremail = await User.findOne({ email });
        if (useremail) {
            return res.json({ message: 'Eamil alreay uses. Try again with new email' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await new User({
            email,
            password: hashedPassword,
            name,
            image: req.file.filename,
            date: new Date,
        }).save();
        console.log(newUser, 'new user');
        res.status(200).json({ message: 'successfully created', newUser });
    } catch (error) {
        console.log(error?.message);
    }
});


//! -----------login route----------
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: 'username email match' });
        }
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.json({ message: 'password didn"t match' });
            }
        }
        const token = jwt.sign(user.email, 'dngfnjnxjmcxnxcn');
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            // secure: process.env.NODE_ENV === 'production',
            // sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        }).json({
            email: user.email,
            token,
            login: true,
            name: user?.name,
            image: user?.image,
            date: user.date,
        })
    } catch (error) {
        console.log(error);
    }
})

//!--------------------post route-----------------
router.post("/add/reviews", async (req, res) => {
    try {
        const { review, rating, email, date, name } = req.body;
        const available = await Review.findOne({ set_name: name })
        if (available) {
            return res.json({ message: 'already reviewed' })
        }
        const reviews = new Review({
            review,
            rating,
            email,
            date,
            name
        });
        console.log(reviews)
        const result = await reviews.save();
        res.status(200).json({ message: 'successfully created', reviews });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/sets', async (req, res) => {
    const email = req.query.email;
    const result = await Review.find({ email });
    res.json(result);
})

router.get('/', async (req, res) => {
    res.json({ message: 'Server running well' });
})

module.exports = router;