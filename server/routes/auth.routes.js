const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const {isAuthenticated} = require ("../middleware/jwt.middleware");
const router = express.Router();
const saltRounds = 10;

// POST /auth/signup
router.post("/signup", (req, res, next) => {
    const {email, password, name} = req.body;

    if (email === "" || password === "" || name === ""){
        res.status(400).json({message: "Please provide email, password and name!"});
        return;
    }

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
if (!emailRegex.test(email)){
    res.status(400).json({message: "Provide a valid email address."});
    return;
}

const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
if (!passwordRegex.test(password)){
    res.status(400).json({message: 'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.' })
    return;
}

User.findOne({email})
    .then((foundUser) => {
        if(foundUser){
            res.status(400).json({message: "User already exists."});
            return;
        }
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
        return User.create({email, password: hashedPassword, name});
    })
    .then((createdUser) => {
        const {email, name, _id} = createdUser;
        const user = {email, name, _id};
        res.status(201).json({user: user});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({message: "Internal server error"})
    });
})



// POST /auth/login

router.post('login', (req, res, next) => {
    const {email, password} = req.body;
    
    
    if(email === '' || password === '') {
        res.status(400).json({message: 'Provide an email and a password.'})
        return;
    }

    User.findOne({email})
    .then((user) => {
        
        if(!user) {
            res.status(401).json({message: 'User not found.'})
            return;
        }

        const verifyPassword = bcrypt.compareSync(password, user.password);
        
        if(verifyPassword) {
            const {_id, email, name } = user;

            const payload = {_id, email, name}

            const authToken = jwt.sign(
                payload,
                "test",
                { algorithm: 'HS256', expiresIn: "6h" }
            );

            res.status(200).json({authToken: authToken});
        } else {
            res.status(401).json({message: "Unable to authenticate user"})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'Internal server error'});
    })
})



// GET /auth/verif
router.get("/verify", isAuthenticated, (req, res, next) => {
    res.status(200).json(req.payload);
})



// GET /api/users/:id

router.get("/:userId", isAuthenticated, (req, res, next) => {
    const userId = Number(req.params.userId);
    User.findById(userId)
        .then((user) => {
            res.status(200).json(user); 
        })
        .catch((error) => {
            res.status(500).json({error: "Error while retrieving a user ID"});
        })
})


module.exports = router;