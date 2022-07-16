const express = require('express');

const app = express();

const custRouters = require('./routes/customers');

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.use('/customers', custRouters);


app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);