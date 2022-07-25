import { User } from "../typeorm/entity/User";
import { AppDataSource } from "../typeorm/data-source";
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');


router.post("/", async (req, res) => {
    const userRepo = AppDataSource.getRepository(User);
    const userToBeRegistered = new User();
    const body = (req.body);
    // check if something is missing from body
    if (!body.username || !body.password || !body.nama || !body.fotoKTP) {
        res.status(400).send("Data is not complete");
    }
    
    const salt = await bcrypt.genSalt(10);
    
    userToBeRegistered.nama = body.nama;
    // check if username already exists (belom)
    if (await userRepo.findOneBy({ username: body.username })) {
        res.status(400).send("Username already exists");
        return;
    }
    userToBeRegistered.username = body.username;
    userToBeRegistered.password = await bcrypt.hash(body.password, salt);
    userToBeRegistered.fotoKTP = body.fotoKTP;

    userRepo.save(userToBeRegistered)
    res.send(userToBeRegistered).status(200)
})

module.exports = router;