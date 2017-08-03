const express = require('express');
const router = express.Router();

router.get('/check', function (req, res) {
  res.json({
    "username": req.user.username
  })
})

module.exports = router
