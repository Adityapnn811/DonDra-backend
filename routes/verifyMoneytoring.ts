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
        try {
            const decoded = jwt.verify(token, "dondraforbinomo");
            if (decoded) {
                const body = req.body;
                const {idMoneytoring} = req.params
                const moneytoringRepo = AppDataSource.getRepository(Moneytoring);
                const moneytoringToBeVerified = await moneytoringRepo.findOne({
                    where: {
                        id: idMoneytoring
                    }, relations: {
                        user: true
                    }
                });
                // cek apakah admin menolak atau menyetujui
                if (body.isRejected) {
                    moneytoringToBeVerified.isRejected = true;
                } else {
                    // tambahkan atau kurangi saldo karena admin setuju
                    const userRepo = AppDataSource.getRepository(User);
                    const user = await userRepo.findOneBy({
                        id: moneytoringToBeVerified.user.id
                    })
                    if (moneytoringToBeVerified.isIncome) {
                        user.saldo += moneytoringToBeVerified.nominal;
                    } else {
                        user.saldo -= moneytoringToBeVerified.nominal;
                    }
                    await userRepo.save(user);
                }
                // update bahwa moneytoring sudah diperiksa admin
                moneytoringToBeVerified.isVerified = true;
                await moneytoringRepo.save(moneytoringToBeVerified);
                res.status(200).send({success: true, message: "Moneytoring has been verified"});
            } else {
                res.status(400).json({error: "Invalid token"});
            }
        } catch {
            res.status(400).json({error: "Something went wrong"});
        }
    }
})

module.exports = router;