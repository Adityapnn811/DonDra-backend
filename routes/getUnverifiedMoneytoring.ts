import { User } from "../typeorm/entity/User";
import { AppDataSource } from "../typeorm/data-source";
import { Moneytoring } from "../typeorm/entity/Moneytoring";
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const cors = require('cors');

router.get('/', cors(), async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        res.status(400).json({error: "No token provided"});
    } else {
        try {
            const decoded = jwt.verify(token, "dondraforbinomo");
            if (decoded) {
                const moneytoringRepo = AppDataSource.getRepository(Moneytoring);
                const moneytorings = await moneytoringRepo.find({
                    where: {
                        isVerified: false
                    }, select: {
                        id: true,
                        nominal: true,
                        isIncome: true,
                        transactionDate: true,
                    }, relations: {
                        user: true
                    }
                });
                res.status(200).json(moneytorings);
            } else {
                res.status(400).json({error: "Invalid token"});
            }
        }catch {
            res.status(400).json({error: "Invalid token"});
        }
    }
})

module.exports = router;