import { User } from "../typeorm/entity/User";
import { AppDataSource } from "../typeorm/data-source";
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Return semua user tapi cek dulu ada authorization tokennya ngga
router.get('/', async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    console.log("Ini token", token)
    if (!token) {
        res.status(400).json({error: "No token provided"});
    } else {
        const decoded = jwt.verify(token, "dondraforbinomo");
        console.log(decoded.username)
        if (decoded) {
            const userRepo = AppDataSource.getRepository(User);
            const users = await userRepo.find({
                where: {
                    isVerified: false
                }
            });
            res.status(200).json(users);
        } else {
            res.status(400).json({error: "Invalid token"});
        }
    }
})

module.exports = router;