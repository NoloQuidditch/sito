var express = require('express');
var router = express.Router();
var session = require('express-session');
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

      res.render('admin', {items: items});
     
});

router.post('/',function(req, res, next){
    console.log(req.body);

    let data = fs.readFileSync("ITEMS.json");
    let prodotti = JSON.parse(data);

    let found = prodotti.find(element => element.ID == req.body.id);
    if (found == undefined){
	found = {}

	found.ID = req.body.id;
	found.nome = req.body.nome;
	found.descrizione = req.body.descrizione;
	found.numero = parseInt(req.body.numero);
	found.prezzo = parseFloat(req.body.prezzo);
	found.stato = "disponibile";
		prodotti.push(found);
	}
		
		else{
	found.nome = req.body.nome;
	found.descrizione = req.body.descrizione;
	found.numero = parseInt(req.body.numero);
	found.prezzo = parseFloat(req.body.prezzo);
	found.stato = req.body.stato;
			}

	fs.writeFileSync("ITEMS.json", JSON.stringify(prodotti, undefined, 1));
});


router.post('/eliminaitem',function(req, res, next){
	console.log(req.body);
	let users = JSON.parse(fs.readFileSync('users.json'));

	 		for (let i = 0; i < users.length; i++){
 			try {
					let ordini = JSON.parse(fs.readFileSync(users[i].utente + '.json'));
		 			 for (let i = 0; i < ordini.length; i++){
		 			 	console.log(ordini[i].prodotti);
		 			 	for(let j = 0; j < ordini[i].prodotti.length; j++){
		 			 		console.log(ordini[i].prodotti[j]);
		 			 		if (ordini[i].prodotti[j].id == req.body.id){
		 			 			res.send("<script>alert('Non è possibile eliminare il prodotto'); location.href='/admin';</script>");
		 			 			console.log('NON ELIMINA');
		 			 		}
		 			 	}
				} 
			}  
     
 		   catch (err){
        if (err.code === 'ENOENT'){
            console.log('File not found!');
            //OK, array vuoto
        } else {
            throw err;
       			 }
    		};	
    	for (let i = 0; i < users.length; i++){

    	}
	 		}
	let data = fs.readFileSync("ITEMS.json");
    let prodotti = JSON.parse(data);
    prodotti = prodotti.filter(p => p.ID != req.body.id);
    fs.writeFileSync("ITEMS.json", JSON.stringify(prodotti, undefined, 1));
    res.send("<script>alert('Prodotto eliminato'); location.href='/admin';</script>");
	console.log('ELIMINA');
    res.redirect('/admin');

});

module.exports = router;