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
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = data_source_1.AppDataSource.getRepository(User_1.User);
    const userToBeRegistered = new User_1.User();
    const body = (req.body);
    // check if something is missing from body
    if (!body.username || !body.password || !body.nama || !body.fotoKTP) {
        res.status(400).send("Data is not complete");
    }
    const salt = yield bcrypt.genSalt(10);
    userToBeRegistered.nama = body.nama;
    // check if username already exists (belom)
    if (yield userRepo.findOneBy({ username: body.username })) {
        res.status(400).send("Username already exists");
        return;
    }
    userToBeRegistered.username = body.username;
    userToBeRegistered.password = yield bcrypt.hash(body.password, salt);
    userToBeRegistered.fotoKTP = body.fotoKTP;
    userRepo.save(userToBeRegistered);
    res.send(userToBeRegistered).status(200);
}));
module.exports = router;
//# sourceMappingURL=register.js.map