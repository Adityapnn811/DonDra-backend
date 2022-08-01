import { Moneytoring } from "../typeorm/entity/Moneytoring";
import { AppDataSource } from "../typeorm/data-source";
import { User } from "../typeorm/entity/User";
const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');

router.put("/:idMoneytoring", cors(), async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        res.status(400).json({error: "No token provided"});
    } else {
        const decoded = jwt.verify(token, "dondraforbinomo");
        if (decoded) {
            const {idMoneytoring} = req.params
            const moneytoringRepo = AppDataSource.getRepository(Moneytoring);
            const userRepo = AppDataSource.getRepository(User);
            const moneytoringToBeVerified = await moneytoringRepo.findOneBy({
                id: idMoneytoring
            });
            const user = await userRepo.findOneBy({
                id: moneytoringToBeVerified.user.id
            })
            if (moneytoringToBeVerified.isIncome) {
                user.saldo += moneytoringToBeVerified.nominal;
            } else {
                user.saldo -= moneytoringToBeVerified.nominal;
            }
            moneytoringToBeVerified.isVerified = true;
            await moneytoringRepo.save(moneytoringToBeVerified);
            res.status(200).send({success: true, message: "Moneytoring has been verified"});
        } else {
            res.status(400).json({error: "Invalid token"});
        }
    }
})

module.exports = router;