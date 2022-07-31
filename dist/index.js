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
const cors = require('cors');
// parser for json from req body
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({ limit: '50mb' });
const registerRouters = require('./routes/register');
const loginRouters = require('./routes/login');
const getUnverifiedUsersRouters = require('./routes/getUnverifiedUsers');
const verifyUserRouters = require('./routes/verifyUser');
const getAllUsersRouters = require('./routes/getAllUsers');
const exchangeRateRouters = require('./routes/exchangeRate');
const checkUserRouters = require('./routes/checkUser');
const getSaldoRouters = require('./routes/getSaldo');
app.use(jsonParser);
// cors options for front end
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000, https://dondra.vercel.app/');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});
const corsOptions = {
    origin: ['https://dondra.vercel.app', 'http://localhost:3000'],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Access-Control-Allow-Origin'],
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
// Check if it's production
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
// initialize redis
data_source_1.AppDataSource.initialize().then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Here you can setup and run express / fastify / any other framework.");
    app.get("/", (req, res) => {
        res.send("Berhasil deploy").status(200);
    });
    app.use('/register', registerRouters);
    app.use('/login', loginRouters);
    app.use('/getUnverifiedUsers', getUnverifiedUsersRouters);
    app.use('/verifyUser', verifyUserRouters);
    app.use('/getAllUsers', getAllUsersRouters);
    app.use('/exchangeRate', exchangeRateRouters);
    app.use('/checkUser', checkUserRouters);
    app.use('/getSaldo', getSaldoRouters);
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
})).catch(error => console.log(error));
module.exports = app;
//# sourceMappingURL=index.js.map