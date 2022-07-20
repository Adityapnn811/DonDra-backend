const express = require('express');
const port = process.env.PORT || 3000;
const app = express();

const custRouters = require('./routes/customers');

app.get("/", (req, res) => {
    res.send("Berhasil deploy");
})

app.get("/test", (_req, res) => {
  res.status(200).send("Endpoint success");
})


app.use('/customers', custRouters);

// TO test
// app.listen(port, () =>
//   console.log('Example app listening on port 3000!'),
// );

module.exports = app