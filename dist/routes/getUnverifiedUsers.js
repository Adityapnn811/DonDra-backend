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
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const cors = require('cors');
// Return semua user tapi cek dulu ada authorization tokennya ngga
router.get('/', cors(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization.split(" ")[1];
    console.log("Ini token", token);
    if (!token) {
        res.status(400).json({ error: "No token provided" });
    }
    else {
        try {
            const decoded = jwt.verify(token, "dondraforbinomo");
            console.log(decoded.username);
            if (decoded) {
                const userRepo = data_source_1.AppDataSource.getRepository(User_1.User);
                const users = yield userRepo.find({
                    where: {
                        isVerified: false
                    }, select: {
                        id: true,
                        nama: true,
                        username: true,
                        fotoKTP: true,
                        isVerified: true,
                        saldo: true,
                    }
                });
                res.status(200).json(users);
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
//# sourceMappingURL=getUnverifiedUsers.js.map