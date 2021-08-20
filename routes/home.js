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

	console.log("GETting home.ejs");

	let data = fs.readFileSync('ITEMS.json');
	items = JSON.parse(data);
		
	let avaibleItems = []

    for (let i = 0; i < items.length; i++)  { 
   
    if (items[i].stato == 'Disponibile')
    {
      avaibleItems.push(items[i]);
    }
}

    
      res.render('home', {items: avaibleItems});
			
});



module.exports = router;
