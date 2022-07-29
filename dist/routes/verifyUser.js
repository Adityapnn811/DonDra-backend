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
const bcrypt = require('bcrypt');
const fs = require('fs');
const cors = require('cors');
const jwt = require('jsonwebtoken');
router.post("/:id", cors(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        res.status(400).json({ error: "No token provided" });
    }
    else {
        const decoded = jwt.verify(token, "dondraforbinomo");
        console.log(decoded.username);
        if (decoded) {
            const { id } = req.params;
            const userRepo = data_source_1.AppDataSource.getRepository(User_1.User);
            const userToBeVerified = yield userRepo.findOneBy({
                id: id
            });
            userToBeVerified.isVerified = true;
            yield userRepo.save(userToBeVerified);
            res.status(200).send({ success: true, message: "User has been verified" });
        }
        else {
            res.status(400).json({ error: "Invalid token" });
        }
    }
}));
module.exports = router;
//# sourceMappingURL=verifyUser.js.map