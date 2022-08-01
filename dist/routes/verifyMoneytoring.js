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
const Moneytoring_1 = require("../typeorm/entity/Moneytoring");
const data_source_1 = require("../typeorm/data-source");
const User_1 = require("../typeorm/entity/User");
const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
router.put("/:idMoneytoring", cors(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        res.status(400).json({ error: "No token provided" });
    }
    else {
        try {
            const decoded = jwt.verify(token, "dondraforbinomo");
            if (decoded) {
                const body = req.body;
                const { idMoneytoring } = req.params;
                const moneytoringRepo = data_source_1.AppDataSource.getRepository(Moneytoring_1.Moneytoring);
                const moneytoringToBeVerified = yield moneytoringRepo.findOne({
                    where: {
                        id: idMoneytoring
                    }, relations: {
                        user: true
                    }
                });
                // cek apakah admin menolak atau menyetujui
                console.log(body.isRejected);
                if (body.isRejected) {
                    moneytoringToBeVerified.isRejected = true;
                }
                else {
                    // tambahkan atau kurangi saldo karena admin setuju
                    const userRepo = data_source_1.AppDataSource.getRepository(User_1.User);
                    const user = yield userRepo.findOneBy({
                        id: moneytoringToBeVerified.user.id
                    });
                    if (moneytoringToBeVerified.isIncome) {
                        user.saldo += moneytoringToBeVerified.nominal;
                    }
                    else {
                        user.saldo -= moneytoringToBeVerified.nominal;
                    }
                    yield userRepo.save(user);
                }
                // update bahwa moneytoring sudah diperiksa admin
                moneytoringToBeVerified.isVerified = true;
                yield moneytoringRepo.save(moneytoringToBeVerified);
                res.status(200).send({ success: true, message: "Moneytoring has been verified" });
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
//# sourceMappingURL=verifyMoneytoring.js.map