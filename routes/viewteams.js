var express = require('express');
var router = express.Router();
var models = require('../models'); 
// var models = require('../staticModels/teams');
const mysql = require ('mysql2');

router.get('/', function (req, res, next) {
models.teams.findAll({}).then(teams => {
    res.send(teams)
})
});

module.exports = router;