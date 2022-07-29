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
const jwt = require('jsonwebtoken');
const cors = require('cors');
router.post("/", cors(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const userRepo = data_source_1.AppDataSource.getRepository(User_1.User);
    const userToCheck = yield userRepo.findOneBy({ username: body.username }); // find user by username
    if (userToCheck) {
        // check if user is verified
        // check if password is correct
        const correctPass = yield bcrypt.compare(body.password, userToCheck.password);
        if (correctPass && userToCheck.isVerified) {
            // create jwt token
            let token = jwt.sign({ username: userToCheck.username }, "dondraforbinomo", { expiresIn: '24h' });
            // send succes status and token so front end can save it in a cookie
            res.status(200).json({ message: "Login success", user: userToCheck, success: true, token: token });
        }
        else {
            if (!userToCheck.isVerified) {
                res.status(400).json({ error: "You are not verified" });
            }
            else {
                res.status(400).json({ error: "Wrong Password or Username" });
            }
        }
    }
    else {
        res.status(401).json({ error: "Wrong Password or Username" });
    }
}));
module.exports = router;
//# sourceMappingURL=login.js.map