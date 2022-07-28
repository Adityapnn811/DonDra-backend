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


app.use(jsonParser)

// cors options for front end
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 
}
app.use(cors(corsOptions));

// Check if it's production
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

AppDataSource.initialize().then(async () => {

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

    console.log("Here you can setup and run express / fastify / any other framework.")
    app.get("/", (req, res) => {
        res.send("Berhasil deploy").status(200);
    })

    // app.get("/getUsers", (req, res) => {
    //     res.send(users).status(200);
    // })
    
    app.use('/register', registerRouters);
    app.use('/login', loginRouters);
    app.use('/getUnverifiedUsers', getUnverifiedUsersRouters);
    
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`),
    );

}).catch(error => console.log(error))
console.log(`${process.env.DATABASE_URL}`)

module.exports = app