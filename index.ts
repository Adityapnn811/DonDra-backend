import express from 'express';
import { Session } from 'inspector';
import "reflect-metadata"
import { AppDataSource } from "./typeorm/data-source"
import { User } from "./typeorm/entity/User"
const port = process.env.PORT || 3001;
const app = express();
const cors = require('cors');
// parser for json from req body
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json({limit: '50mb'});
const registerRouters = require('./routes/register');
const loginRouters = require('./routes/login');
const getUnverifiedUsersRouters = require('./routes/getUnverifiedUsers');
const verifyUserRouters = require('./routes/verifyUser');
const getAllUsersRouters = require('./routes/getAllUsers');
const checkUserRouters = require('./routes/checkUser');
const getSaldoRouters = require('./routes/getSaldo');
const transferRouters = require('./routes/transfer');
const getHistoryRouters = require('./routes/getHistory');
const getUnverifiedMoneytoringRouters = require('./routes/getUnverifiedMoneytoring');
const verifyMoneytoringRouters = require('./routes/verifyMoneytoring');
const requestMoneytoringRouters = require('./routes/requestMoneytoring');


app.use(jsonParser)

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
}
app.use(cors(corsOptions));
app.options('*', cors(corsOptions))

// Check if it's production
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// initialize redis

AppDataSource.initialize().then(async () => {
    
    app.get("/", (req, res) => {
        res.send("Berhasil deploy").status(200);
    })
    
    app.use('/register', registerRouters);
    app.use('/login', loginRouters);
    app.use('/getUnverifiedUsers', getUnverifiedUsersRouters);
    app.use('/verifyUser', verifyUserRouters);
    app.use('/getAllUsers', getAllUsersRouters);
    app.use('/checkUser', checkUserRouters);
    app.use('/getSaldo', getSaldoRouters);
    app.use('/transfer', transferRouters);
    app.use('/getHistory', getHistoryRouters);
    app.use('/getUnverifiedMoneytoring', getUnverifiedMoneytoringRouters);
    app.use('/verifyMoneytoring', verifyMoneytoringRouters);
    app.use('/requestMoneytoring', requestMoneytoringRouters);

    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`),
    );

}).catch(error => console.log(error))

module.exports = app