"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const data_source_1 = require("../typeorm/data-source");
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send("Berhasil deploy");
});
app.get("/test", (_req, res) => {
    res.status(200).send("Endpoint success");
});
app.get("/testDB", (_req, res) => {
    data_source_1.AppDataSource.initialize().then(async => {
        res.status(200).send("Database is running and connected");
    }).catch(error => {
        res.status(500).send(error);
    });
});
module.exports = app;
//# sourceMappingURL=index.js.map