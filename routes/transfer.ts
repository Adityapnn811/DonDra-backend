import { User } from "../typeorm/entity/User";
import { AppDataSource } from "../typeorm/data-source";
import { Transfer } from "../typeorm/entity/Transfer";
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const cors = require('cors');

// Langsung transfer sekalian masukin history transfer
// Apakah ini Decorator?
router.post('/', cors(), async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        res.status(400).json({error: "No token provided"});
    } else {
        try {
            const decoded = jwt.verify(token, "dondraforbinomo");
            if (decoded) {
                const body = req.body;
                const transferHistoryRepo = AppDataSource.getRepository(Transfer);
                const userRepo = AppDataSource.getRepository(User);
                // cari user dengan id penerima dan pengirim
                const userPenerima = await userRepo.findOneBy({
                    id: parseInt(body.rekPenerima)
                });
                const userPengirim = await userRepo.findOneBy({
                    id: parseInt(body.rekPengirim)
                });
                // kurangi saldo pengirim dan tambahkan saldo penerima
                userPengirim.saldo -= parseFloat(body.nominal);
                userPenerima.saldo += parseFloat(body.nominal);
                // masukin history transfer
                const transferHistory = new Transfer();
                transferHistory.userIDPengirim = userPengirim.id;
                transferHistory.userIDPenerima = userPenerima.id;
                transferHistory.nominal = parseFloat(body.nominal);
                // save ke repo user dan transfer
                await userRepo.save([userPengirim, userPenerima]);
                await transferHistoryRepo.save(transferHistory);
            res.status(200).json({message: "Transfer success", success: true});
            } else {
                res.status(400).json({error: "Invalid token"});
            }
        } catch {
            res.status(400).json({error: "Invalid token"});
        }
    }
})

module.exports = router;