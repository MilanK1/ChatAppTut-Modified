const mongoose = require("mongoose");
const User = require("./Models/Models.js");
const express = require("express");
const router = express.Router();

router.post("/data", function saveData(req, res) {
  console.log("POSTREQ:", req.body);
  const saveData = new User({
    name: req.body.name,
    message: req.body.message,
  });
  saveData
    .save()
    .then(() => {
      res.status(200).json("Data was saved!");
    })
    .catch(error => {
      console.log(error);
    });
  console.log("POST");
});
module.exports = router;
