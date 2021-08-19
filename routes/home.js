var express = require('express');
var router = express.Router();
var moment = require('moment');

const fs = require('fs');
 let items;
 fs.readFile('ITEMS.json', (err, data) => {
    items = JSON.parse(data);
    if (err) throw err; 
    console.log(items);
    });
/* GET home page. */
router.get('/', function(req, res, next) {
			res.render('home', {items: Object.values(JSON.parse(JSON.stringify(items)))});
			
});


module.exports = router;