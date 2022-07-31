import express from 'express';
import "reflect-metadata"
import { AppDataSource } from "../typeorm/data-source"

const Redis = require('ioredis')
const port = process.env.PORT || 3000;
const app = express();

// initialize redis
let redisClient = new Redis(process.env.REDIS_URL);

app.get("/", (req, res) => {
    res.send("Berhasil deploy");
})

app.get("/test", (_req, res) => {
  res.status(200).send("Endpoint success");
})

app.get("/testDB", (_req, res) => {
  AppDataSource.initialize().then(() => {
    res.status(200).send("Database is running and connected");
  }).catch(error => {
    res.status(500).send(error);
  })
})

module.exports = app