import { User } from "../typeorm/entity/User";
import { AppDataSource } from "../typeorm/data-source";
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const cors = require('cors');

// Return semua user tapi cek dulu ada authorization tokennya ngga
router.get('/', cors(), async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        res.status(400).json({error: "No token provided"});
    } else {
        try {
            const decoded = jwt.verify(token, "dondraforbinomo");
            console.log(decoded.username)
            if (decoded) {
                const userRepo = AppDataSource.getRepository(User);
                const users = await userRepo.find({
                    select: {
                        id: true,
                        nama: true,
                        username: true,
                        fotoKTP: true,
                        isVerified: true,
                        saldo: true,
                    }, where: {
                        role: "user"
                    }
                })
                res.status(200).json(users);
            } else {
                res.status(400).json({error: "Invalid token"});
            }
        } catch {
            res.status(400).json({error: "Something went wrong"});
        }
    }
})

// return user berdasarkan ID
router.get('/:id', cors(), async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        res.status(400).json({error: "No token provided"});
    } else {
        try {
            const decoded = jwt.verify(token, "dondraforbinomo");
            console.log(decoded.username)
            if (decoded) {
                const userRepo = AppDataSource.getRepository(User);
                const user = await userRepo.findOneBy({
                    id: req.params.id
                })
                res.status(200).json(user);
            } else {
                res.status(400).json({error: "Invalid token"});
            }
        } catch {
            res.status(400).json({error: "Something went wrong"});
        }
    }
})

module.exports = router;