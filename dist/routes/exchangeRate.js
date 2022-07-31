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
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const cors = require('cors');
router.get("/currencies", cors(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // if (redisClient.exists("currencies")) {
    //     console.log("cache miss")
    //     const currencies = await redisClient.get("currencies");
    //     res.status(200).json(JSON.parse(currencies));
    //     redisClient.del("currencies")
    // } else {
    //     console.log("cache miss")
    //     axios({
    //         method: "GET",
    //         url: "https://api.apilayer.com/exchangerates_data/symbols",
    //         headers: {
    //             'apikey': 'XziOZtA0GGfi4wonGizQxxzSixUXJv9f'
    //         }
    //     }).then(function (response) {
    //         console.log(response.data)
    //     })
    // }
}));
module.exports = router;
//# sourceMappingURL=exchangeRate.js.map