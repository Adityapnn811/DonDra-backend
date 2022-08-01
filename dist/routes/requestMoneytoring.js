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
const Moneytoring_1 = require("../typeorm/entity/Moneytoring");
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const cors = require('cors');
router.post('/', cors(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        res.status(400).json({ error: "No token provided" });
    }
    else {
        const decoded = jwt.verify(token, "dondraforbinomo");
        if (decoded) {
            const body = req.body;
            const userRepo = data_source_1.AppDataSource.getRepository(User_1.User);
            // cari user dengan id penerima dan pengirim
            const user = yield userRepo.findOneBy({
                id: body.id
            });
            // Buat moneytoring baru
            const moneytoring = new Moneytoring_1.Moneytoring();
            moneytoring.user = user;
            moneytoring.nominal = parseFloat(body.nominal);
            moneytoring.isIncome = body.isIncome;
            moneytoring.isVerified = false;
            // save
            yield data_source_1.AppDataSource.manager.save(moneytoring);
            res.status(200).json({ message: "Request success" });
        }
        else {
            res.status(400).json({ error: "Invalid token" });
        }
    }
}));
module.exports = router;
//# sourceMappingURL=requestMoneytoring.js.map