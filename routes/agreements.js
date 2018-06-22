const express = require('express');
const router = express.Router();
var passport = require("passport");
const jwt = require("jsonwebtoken");
const configa = require("../config/agreementDB");

// Bring in agreement model
const Agreement = require('../models/agreement');

// Register
router.post('/aregister', (req, res, next) => {
let newAgreement = new Agreement({
  templateType: req.body.templateType,
  serviceProvider: req.body.serviceProvider,
  serviceConsumer: req.body.serviceConsumer,
  purpose: req.body.purpose
});

Agreement.addAgreement(newAgreement , (err, agreement) => {
  if(err){
    res.json({success: false, msg:'Failed to register agreement'});
  } else{
    res.json({success : true, msg:'agreement registered'});
  }
});
});

// get Agreement
router.get('/:templateType', (req, res, next) => {
  const type = req.params.templateType;
  Agreement.getagreementByType(type, (err, agreement) => {
    if (err) throw err
    console.log(agreement);
    res.json(agreement);
  });
});


module.exports = router;
