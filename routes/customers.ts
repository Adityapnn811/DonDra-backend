const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.send("You're in customers").status(200)
})

module.exports = router;