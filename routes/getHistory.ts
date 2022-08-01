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
        try {
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
                        userIDPenerima: userToBeChecked
                    }, select: {
                        id: true,
                        nominal: true,
                        transferDate: true,
                    }, relations: {
                        userIDPengirim: true
                    }
                }).catch(err => console.log(err))
                const transferHistoryKeluar = await transferHistoryRepo.find({
                    where: {
                        userIDPengirim: userToBeChecked
                    }, select: {
                        id: true,
                        nominal: true,
                        transferDate: true,
                    }, relations: {
                        userIDPenerima: true
                    }
                }).catch(err => console.log(err))
    
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
                }).catch(err => console.log(err))
    
                res.status(200).json({transferMasuk: transferHistoryMasuk, transferKeluar: transferHistoryKeluar, moneytoringHistory: moneytoringHistory});
            } else {
                res.status(400).json({error: "Invalid token"});
            }
        } catch {
            res.status(400).json({error: "Invalid token"});
        }
    }
})

module.exports = router;