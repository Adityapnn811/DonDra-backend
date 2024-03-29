"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../typeorm/entity/User");
const data_source_1 = require("../typeorm/data-source");
const Transfer_1 = require("../typeorm/entity/Transfer");
const Moneytoring_1 = require("../typeorm/entity/Moneytoring");
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const cors = require('cors');
// pake query, jadi nanti /:id?page=1
router.get('/:id', cors(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        res.status(400).json({ error: "No token provided" });
    }
    else {
        try {
            const decoded = jwt.verify(token, "dondraforbinomo");
            if (decoded) {
                // get request query, default take adalah 5, default page adalah 1
                const limit = 5;
                const page = parseInt(req.query.page) || 1;
                const startIndex = (page - 1) * limit;
                const endIndex = page * limit;
                const { id } = req.params;
                const transferHistoryRepo = data_source_1.AppDataSource.getRepository(Transfer_1.Transfer);
                const moneytoringRepo = data_source_1.AppDataSource.getRepository(Moneytoring_1.Moneytoring);
                const userRepo = data_source_1.AppDataSource.getRepository(User_1.User);
                // cari user dengan id
                const userToBeChecked = yield userRepo.findOneBy({
                    id: id
                });
                // Cari history transfer
                const transferHistoryMasuk = yield transferHistoryRepo.find({
                    where: {
                        userIDPenerima: userToBeChecked
                    }, select: {
                        id: true,
                        nominal: true,
                        transferDate: true,
                    }, relations: {
                        userIDPengirim: true
                    }
                }).catch(err => console.log(err));
                const transferHistoryKeluar = yield transferHistoryRepo.find({
                    where: {
                        userIDPengirim: userToBeChecked
                    }, select: {
                        id: true,
                        nominal: true,
                        transferDate: true,
                    }, relations: {
                        userIDPenerima: true
                    }
                }).catch(err => console.log(err));
                // Cari history moneytoring
                const moneytoringHistory = yield moneytoringRepo.find({
                    where: {
                        user: userToBeChecked
                    }, select: {
                        id: true,
                        nominal: true,
                        isIncome: true,
                        transactionDate: true,
                        isVerified: true,
                        isRejected: true
                    }
                }).catch(err => console.log(err));
                // Jadikan satu
                const history = [];
                if (transferHistoryMasuk) {
                    transferHistoryMasuk.forEach(transfer => {
                        history.push(transfer);
                    });
                }
                if (transferHistoryKeluar) {
                    transferHistoryKeluar.forEach(transfer => {
                        history.push(transfer);
                    });
                }
                if (moneytoringHistory) {
                    moneytoringHistory.forEach(transfer => {
                        history.push(transfer);
                    });
                }
                // Buat variabel yang menampung meta data (page sebelum dan setelah) sama data
                const result = {
                    prev: null,
                    next: null,
                    data: []
                };
                // Hitung page selanjut dan sebelum
                if (startIndex > 0) {
                    result.prev = page - 1;
                }
                if (endIndex < history.length) {
                    result.next = page + 1;
                }
                result.data = history.slice(startIndex, endIndex);
                if (history[1].isIncome != undefined) {
                    console.log("dia transfer");
                }
                res.status(200).json({ success: true, result: result, total: history.length, currentPage: page, limit: limit });
            }
            else {
                res.status(400).json({ error: "Invalid token" });
            }
        }
        catch (_a) {
            res.status(400).json({ error: "Something went wrong" });
        }
    }
}));
module.exports = router;
//# sourceMappingURL=getHistory.js.map