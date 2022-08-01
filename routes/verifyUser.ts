import { User } from "../typeorm/entity/User";
import { AppDataSource } from "../typeorm/data-source";
const express = require('express');
const router = express.Router();

const cors = require('cors');
const jwt = require('jsonwebtoken');

router.put("/:id", cors(), async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        res.status(400).json({error: "No token provided"});
    } else {
        try {
            const decoded = jwt.verify(token, "dondraforbinomo");
            console.log(decoded.username)
            if (decoded) {
                const {id} = req.params
                const userRepo = AppDataSource.getRepository(User);
                const userToBeVerified = await userRepo.findOneBy({
                    id: id
                });
                userToBeVerified.isVerified = true;
                await userRepo.save(userToBeVerified);
                res.status(200).send({success: true, message: "User has been verified"});
            } else {
                res.status(400).json({error: "Invalid token"});
            }
        } catch {
            res.status(400).json({error: "Invalid token"});
        }
    }
})

module.exports = router;