var express = require('express');
var router = express.Router();
var session = require('express-session');
var moment = require('moment');
app.use( express.static( "public" ) );

const fs = require('fs');
 fs.readFile('ITEMS.json', (err, data) => {
    items = JSON.parse(data);
    if (err) throw err; 
    });


router.get('/', function(req, res, next) {

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


 router.post('/', function(req, res, next){
        console.log("Ricevuto una richiesta POST");

        console.log(req.session.username);

        let ordiniUtente = [];
        try {
            ordiniUtente = JSON.parse(fs.readFileSync(req.session.username + '.json'));
        } catch (err){
            if (err.code === 'ENOENT'){
                console.log('File not found!');
                } else {
                throw err;
            }
        };

      
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
                let oggetto = { id: req.body.id[i], nome: req.body.nome[i], quantita: quantity[i], prezzo: parseFloat(req.body.prezzo[i])* parseInt(quantity[i])};
                ordineProdotti.push(oggetto);
            }
                }

            let ordine = {
                utente: req.session.username,
                dataeora: new Date().toISOString(),
                prodotti: ordineProdotti,
                totale: somma,
                stato: "noleggio in corso"
         }
        console.log(prodotti);
        fs.writeFileSync("ITEMS.json", JSON.stringify(prodotti, undefined, 1));
        ordiniUtente.push(ordine);
        fs.writeFileSync(req.session.username + '.json', JSON.stringify(ordiniUtente, undefined, 1));
        
 res.render('pagamento', {order : ordine});
});
 

module.exports = router;
