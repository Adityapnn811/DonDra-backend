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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const data_source_1 = require("./typeorm/data-source");
const port = process.env.PORT || 3001;
const app = (0, express_1.default)();
const registerRouters = require('./routes/register');
const cors = require('cors');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({ limit: '50mb' });
app.use(jsonParser);
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
data_source_1.AppDataSource.initialize().then(() => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("Inserting a new user into the database...")
    // const user = new User()
    // user.firstName = "Timber"
    // user.lastName = "Saw"
    // user.age = 25
    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)
    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(User)
    // console.log("Loaded users: ", users)
    console.log("Here you can setup and run express / fastify / any other framework.");
    app.get("/", (req, res) => {
        res.send("Berhasil deploy").status(200);
    });
    // app.get("/getUsers", (req, res) => {
    //     res.send(users).status(200);
    // })
    app.use('/register', registerRouters);
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
})).catch(error => console.log(error));
console.log(`${process.env.DATABASE_URL}`);
module.exports = app;
//# sourceMappingURL=index.js.map