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
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const cors = require('cors');
// Langsung transfer sekalian masukin history transfer
// Apakah ini Decorator?
router.get('/', cors(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        res.status(400).json({ error: "No token provided" });
    }
    else {
        const decoded = jwt.verify(token, "dondraforbinomo");
        if (decoded) {
            const body = req.body;
            const transferHistoryRepo = data_source_1.AppDataSource.getRepository(Transfer_1.Transfer);
            const userRepo = data_source_1.AppDataSource.getRepository(User_1.User);
            // cari user dengan id penerima dan pengirim
            const userPenerima = yield userRepo.findOneBy({
                id: body.rekPenerima
            });
            const userPengirim = yield userRepo.findOneBy({
                id: body.rekPengirim
            });
            // kurangi saldo pengirim dan tambahkan saldo penerima
            userPengirim.saldo -= parseFloat(body.nominal);
            userPenerima.saldo += parseFloat(body.nominal);
            // masukin history transfer
            const transferHistory = new Transfer_1.Transfer();
            transferHistory.userIDPengirim = userPengirim.id;
            transferHistory.userIDPenerima = userPenerima.id;
            transferHistory.nominal = parseFloat(body.nominal);
            // save ke repo user dan transfer
            yield userRepo.save([userPengirim, userPenerima]);
            yield transferHistoryRepo.save(transferHistory);
            res.status(200).json({ message: "Transfer success" });
        }
        else {
            res.status(400).json({ error: "Invalid token" });
        }
    }
}));
module.exports = router;
//# sourceMappingURL=transfer.js.map