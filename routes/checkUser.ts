import { User } from "../typeorm/entity/User";
import { AppDataSource } from "../typeorm/data-source";
import { QueryFailedError } from "typeorm";
const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
import { DatabaseError } from 'pg-protocol';

export const isQueryFailedError = (err: unknown): err is QueryFailedError & DatabaseError =>
  err instanceof QueryFailedError;

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
                const userToBeChecked = await userRepo.findOne({
                    where: {
                        id: id,
                        isVerified: true
                    }
                }).catch(err => {
                    if (isQueryFailedError(err)) {
                        res.status(400).json({error: "User not found"});
                    } else {
                        res.status(400).json({error: "Something went wrong"});
                    }
                })
                if (userToBeChecked) {
                    res.status(200).send({success: true, message: "User is Valid", userName: userToBeChecked.nama});
                } else {
                    res.status(400).json({error: "User not found"});
                }
            } else {
                res.status(400).json({error: "Invalid token"});
            }
        } catch {
            res.status(400).json({error: "Invalid token"});
        }
    }
})
    
module.exports = router;