var express = require('express');
var router = express.Router();
var moment = require('moment');
var session = require('express-session');


/* GET home page. */
router.get('/', function(req, res, next) {
			res.render('', {nome:"NOLO QUIDDITCH"});
			
});

module.exports = router;