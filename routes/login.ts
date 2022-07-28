import { User } from "../typeorm/entity/User";
import { AppDataSource } from "../typeorm/data-source";
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post("/", async (req, res) => {
    const body = req.body;
    const userRepo = AppDataSource.getRepository(User);
    const userToCheck = await userRepo.findOneBy({ username: body.username }) // find user by username
    if (userToCheck) {
        // check if user is verified
        // check if password is correct
        const correctPass = await bcrypt.compare(body.password, userToCheck.password);
        if (correctPass && userToCheck.isVerified) {
            // create jwt token
            let token = jwt.sign({username: userToCheck.username}, 
                "dondraforbinomo",
                {expiresIn: '24h'}
                );
            // send succes status and token so front end can save it in a cookie
            res.status(200).json({message: "Login success", user: userToCheck, success: true, token: token});
        } else {
            if (!userToCheck.isVerified) {
                res.status(400).json({error: "You are not verified"})
            } else {
                res.status(400).json({error: "Wrong Password or Username"})
            }
        }
    } else {
        res.status(401).json({error: "Wrong Password or Username"})
    }
})

module.exports = router;