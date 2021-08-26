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
		
	let avaibleItems = []

    for (let i = 0; i < items.length; i++)  { 
   
    if (items[i].numero > 0)
    {
      avaibleItems.push(items[i]);
    }
}

      res.render('home', {items: avaibleItems});
     
});

 router.post('/',function(req, res, next){
        console.log("Ricevuto una richiesta POST");

        console.log(req.session.username);

        let ordiniUtente = [];
        try {
            ordiniUtente = JSON.parse(fs.readFileSync(req.session.username + '.json'));
        } catch (err){
            if (err.code === 'ENOENT'){
                console.log('File not found!');
                //OK, array vuoto
            } else {
                throw err;
            }
        };

        // contenuto della richiesta
            let data = fs.readFileSync("ITEMS.json");
            let prodotti = JSON.parse(data);

        let quantity = req.body.quantity;
        console.log(quantity);
         console.log(req.body.id);
         console.log(req.body.id.length);
         console.log(req.body.prezzo);

         let somma=0;
         let ordineProdotti= [];


         for (let i = 0; i < req.body.id.length; i++) {
            if (parseInt(quantity[i])>0){
                console.log("prodotto");
                console.log(quantity[i], req.body.id[i]);
                somma = somma + parseFloat(req.body.prezzo[i])* parseInt(quantity[i]);
                console.log(somma);
                let found = prodotti.find(element => element.ID == req.body.id[i]);
                found.numero = found.numero - quantity[i];

                let oggetto = { id: req.body.id[i], quantita: quantity[i]};
                ordineProdotti.push(oggetto);
            }
                }
            let ordine = {
                utente: req.session.username,
                dataeora: new Date().toISOString(),
                prodotti: ordineProdotti,
                stato: "noleggio in corso"
         }
        console.log(prodotti);
        fs.writeFileSync("ITEMS.json", JSON.stringify(prodotti, undefined, 1));
        res.send("Devi pagare: " + somma + " Galeoni");
        ordiniUtente.push(ordine);
        fs.writeFileSync(req.session.username + '.json', JSON.stringify(ordiniUtente, undefined, 1));

});
 


module.exports = router;
