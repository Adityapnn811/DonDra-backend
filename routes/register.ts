import { User } from "../typeorm/entity/User";
import { AppDataSource } from "../typeorm/data-source";
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const fs = require('fs')


router.post("/", async (req, res) => {
    const userRepo = AppDataSource.getRepository(User);
    const userToBeRegistered = new User();
    const body = (req.body);
    // declare image path
    const imagePath = './public/images/' + body.username + '.png';
    // check if something is missing from body
    if (!body.username || !body.password || !body.nama || !body.fotoKTP) {
        res.status(400).json({error: "Data is not complete, server couldn't parse it"});
        return;
    }
    
    const salt = await bcrypt.genSalt(10);
    
    userToBeRegistered.nama = body.nama;
    // check if username already exists (belom)
    if (await userRepo.findOneBy({ username: body.username })) {
        res.status(400).json({error: "Username already exists"});
        return;
    }
    userToBeRegistered.username = body.username;
    userToBeRegistered.password = await bcrypt.hash(body.password, salt);
    userToBeRegistered.fotoKTP = body.fotoKTP;

    // convert base64 to png
    const base64Data = body.fotoKTP.replace(/^data:([A-Za-z-+/]+);base64,/, '');
    // save image to image path
    fs.writeFileSync(imagePath, base64Data, {encoding: 'base64'});

    userRepo.save(userToBeRegistered)
    res.send(userToBeRegistered).status(200)
})

module.exports = router;