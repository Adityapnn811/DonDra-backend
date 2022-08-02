import "reflect-metadata"
import { AppDataSource } from "./data-source"
import { User, UserRole } from "./entity/User"
import { Moneytoring } from "./entity/Moneytoring";
import bcrypt from 'bcrypt';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

AppDataSource.initialize().then(async () => {
    //generate salt
    const salt = await bcrypt.genSalt(10);

    // create user repo
    const userRepo = AppDataSource.getRepository(User)
    let user = new User()
    user.nama = "Admin Ganteng"
    user.username = "admin"
    user.password = await bcrypt.hash("admin", salt);
    user.fotoKTP = "gambar"
    user.role = UserRole.ADMIN
    user.isVerified = true
    user.saldo = 0
    await userRepo.save(user)

    // create new user
    user = new User()
    user.nama = "User Ganteng"
    user.username = "usergans"
    user.password = await bcrypt.hash("usergans", salt);
    user.fotoKTP = "gambar"
    user.role = UserRole.USER
    user.saldo = 100000
    user.isVerified = true
    await userRepo.save(user)

    // create new moneytoring
    const moneytoringRepo = AppDataSource.getRepository("moneytoring")
    const moneytoring = new Moneytoring()
    moneytoring.nominal = 100000
    moneytoring.isIncome = true
    moneytoring.isVerified = true
    moneytoring.user = user
    await moneytoringRepo.save(moneytoring)

}).catch(error => console.log(error))