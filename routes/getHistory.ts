import { User } from "../typeorm/entity/User";
import { AppDataSource } from "../typeorm/data-source";
import { Transfer } from "../typeorm/entity/Transfer";
import { Moneytoring } from "../typeorm/entity/Moneytoring";
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const cors = require('cors');


router.get('/:id', cors(), async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        res.status(400).json({error: "No token provided"});
    } else {
        const decoded = jwt.verify(token, "dondraforbinomo");
        if (decoded) {
            const {id} = req.params
            const transferHistoryRepo = AppDataSource.getRepository(Transfer);
            const moneytoringRepo = AppDataSource.getRepository(Moneytoring);
            const userRepo = AppDataSource.getRepository(User);
            // cari user dengan id 
            const userToBeChecked = await userRepo.findOneBy({
                id: id
            });


            // Cari history transfer
            const transferHistoryMasuk = await transferHistoryRepo.find({
                where: {
                    userIDPenerima: id
                }, select: {
                    id: true,
                    nominal: true,
                    transferDate: true,
                    userIDPengirim: true
                }
            })
            const transferHistoryKeluar = await transferHistoryRepo.find({
                where: {
                    userIDPengirim: id
                }, select: {
                    id: true,
                    nominal: true,
                    transferDate: true,
                    userIDPenerima: true
                }
            })

            // Cari history moneytoring
            const moneytoringHistory = await moneytoringRepo.find({
                where: {
                    user: userToBeChecked
                }, select: {
                    id: true,
                    nominal: true,
                    isIncome: true,
                    transactionDate: true,
                    isVerified: true
                }
            })

            res.status(200).json({transferMasuk: transferHistoryMasuk, transferKeluar: transferHistoryKeluar, moneytoringHistory: moneytoringHistory});
        } else {
            res.status(400).json({error: "Invalid token"});
        }
    }
})

module.exports = router;