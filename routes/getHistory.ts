import { User } from "../typeorm/entity/User";
import { AppDataSource } from "../typeorm/data-source";
import { Transfer } from "../typeorm/entity/Transfer";
import { Moneytoring } from "../typeorm/entity/Moneytoring";
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const cors = require('cors');

// pake query, jadi nanti /:id?page=1
router.get('/:id', cors(), async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        res.status(400).json({error: "No token provided"});
    } else {
        try {
            const decoded = jwt.verify(token, "dondraforbinomo");
            if (decoded) {
                // get request query, default take adalah 5, default page adalah 1
                const limit = 5
                const page = parseInt(req.query.page) || 1;
                const startIndex = (page - 1) * limit;
                const endIndex = page * limit;

                
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
                // Jadikan satu
                const history = []
                if (transferHistoryMasuk) {
                    transferHistoryMasuk.forEach(transfer => {
                        history.push(transfer)
                    })
                }
                if (transferHistoryKeluar) {
                    transferHistoryKeluar.forEach(transfer => {
                        history.push(transfer)
                    })
                }
                if (moneytoringHistory) {
                    moneytoringHistory.forEach(transfer => {
                        history.push(transfer)
                    })
                }
                // Buat variabel yang menampung meta data (page sebelum dan setelah) sama data
                const result = {
                    prev: null,
                    next: null,
                    data: []
                };
                // Hitung page selanjut dan sebelum
                if (startIndex > 0) {
                    result.prev = page-1
                }
                if (endIndex < history.length) {
                    result.next = page+1
                }
                result.data = history.slice(startIndex, endIndex);
                if (history[1].isIncome != undefined) {
                    console.log("dia transfer")
                }
                res.status(200).json({success: true, result: result, total: history.length, currentPage: page, limit: limit});
            } else {
                res.status(400).json({error: "Invalid token"});
            }
        } catch {
            res.status(400).json({error: "Something went wrong"});
        }
    }
})

module.exports = router;