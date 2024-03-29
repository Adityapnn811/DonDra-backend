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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../typeorm/entity/User");
const data_source_1 = require("../typeorm/data-source");
const express = require('express');
const router = express.Router();
const bcrypt_1 = __importDefault(require("bcrypt"));
const fs = require('fs');
const cors = require('cors');
router.post("/", cors(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = data_source_1.AppDataSource.getRepository(User_1.User);
    const userToBeRegistered = new User_1.User();
    const body = (req.body);
    // declare image path
    const imagePath = './public/images/' + body.username + '.png';
    // check if something is missing from body
    if (!body.username || !body.password || !body.nama || !body.fotoKTP) {
        res.status(400).json({ error: "Data is not complete, server couldn't parse it" });
        return;
    }
    const salt = yield bcrypt_1.default.genSalt(10);
    userToBeRegistered.nama = body.nama;
    // check if username already exists (belom)
    if (yield userRepo.findOneBy({ username: body.username })) {
        res.status(400).json({ error: "Username already exists" });
        return;
    }
    userToBeRegistered.username = body.username;
    userToBeRegistered.password = yield bcrypt_1.default.hash(body.password, salt);
    userToBeRegistered.fotoKTP = body.fotoKTP;
    // convert base64 to png
    const base64Data = body.fotoKTP.replace(/^data:([A-Za-z-+/]+);base64,/, '');
    // save image to image path
    fs.writeFileSync(imagePath, base64Data, { encoding: 'base64' });
    userRepo.save(userToBeRegistered);
    res.send(userToBeRegistered).status(200);
}));
module.exports = router;
//# sourceMappingURL=register.js.map