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
require("reflect-metadata");
const data_source_1 = require("./data-source");
const User_1 = require("./entity/User");
const Moneytoring_1 = require("./entity/Moneytoring");
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
data_source_1.AppDataSource.initialize().then(() => __awaiter(void 0, void 0, void 0, function* () {
    // create user repo
    const userRepo = data_source_1.AppDataSource.getRepository(User_1.User);
    let user = new User_1.User();
    user.nama = "Admin Ganteng";
    user.username = "admin";
    user.password = "admin";
    user.fotoKTP = "gambar";
    user.role = User_1.UserRole.ADMIN;
    user.isVerified = true;
    user.saldo = 0;
    yield userRepo.save(user);
    // create new user
    user = new User_1.User();
    user.nama = "User Ganteng";
    user.username = "usergans";
    user.password = "usergans";
    user.fotoKTP = "gambar";
    user.role = User_1.UserRole.USER;
    user.saldo = 100000;
    user.isVerified = true;
    yield userRepo.save(user);
    // create new moneytoring
    const moneytoringRepo = data_source_1.AppDataSource.getRepository("moneytoring");
    const moneytoring = new Moneytoring_1.Moneytoring();
    moneytoring.nominal = 100000;
    moneytoring.isIncome = true;
    moneytoring.isVerified = true;
    moneytoring.user = user;
    yield moneytoringRepo.save(moneytoring);
})).catch(error => console.log(error));
//# sourceMappingURL=seed.js.map