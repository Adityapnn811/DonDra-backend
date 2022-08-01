import { User } from "../typeorm/entity/User";
import { AppDataSource } from "../typeorm/data-source";
import { Moneytoring } from "../typeorm/entity/Moneytoring";
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const cors = require('cors');

router.post('/', cors(), async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        res.status(400).json({error: "No token provided"});
    } else {
        try {
            const decoded = jwt.verify(token, "dondraforbinomo");
            if (decoded) {
                const body = req.body;
                const userRepo = AppDataSource.getRepository(User);
                // cari user dengan id penerima dan pengirim
                const user = await userRepo.findOneBy({
                    id: body.id
                });
                // Buat moneytoring baru
                const moneytoring = new Moneytoring();
                moneytoring.user = user;
                moneytoring.nominal = parseFloat(body.nominal);
                moneytoring.isIncome = body.isIncome;
                moneytoring.isVerified = false
                // save
                await AppDataSource.manager.save(moneytoring);
                res.status(200).json({message: "Request success"});
            } else {
                res.status(400).json({error: "Invalid token"});
            }
        } catch {
            res.status(400).json({error: "Invalid token"});
        }
    }
})

module.exports = router;