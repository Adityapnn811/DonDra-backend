import { User } from "../typeorm/entity/User";
import { AppDataSource } from "../typeorm/data-source";
const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');

router.get("/:id", cors(), async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        res.status(400).json({error: "No token provided"});
    } else {
        try {

            const decoded = jwt.verify(token, "dondraforbinomo");
            if (decoded) {
                const {id} = req.params
                const userRepo = AppDataSource.getRepository(User);
                const userToBeChecked = await userRepo.findOneBy({
                    id: id
                })
                if (userToBeChecked) {
                    res.status(200).json(userToBeChecked);
                }
            } else {
                res.status(400).json({error: "Invalid token"});
            }
        } catch {
            res.status(400).json({error: "Something went wrong"});
        }
    }
})

module.exports = router;