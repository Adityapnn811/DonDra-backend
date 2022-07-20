"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send("Berhasil deploy");
});
app.get("/test", (_req, res) => {
    res.status(200).send("Endpoint success");
});
module.exports = app;
//# sourceMappingURL=index.js.map