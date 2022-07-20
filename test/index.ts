import express from 'express';
const port = process.env.PORT || 3000;
const app = express();

app.get("/", (req, res) => {
    res.send("Berhasil deploy");
})

app.get("/test", (_req, res) => {
  res.status(200).send("Endpoint success");
})

module.exports = app