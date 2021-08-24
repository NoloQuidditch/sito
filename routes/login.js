var express = require('express');
var router = express.Router();
var session = require('express-session');
var moment = require('moment');


/* GET home page. */
router.get('/', function(req, res, next) {
			res.render('login');
			
});

router.post('/', function(req, res, next) {



	let consentito = false

    for (let i = 0; i < users.length; i++)

  { 
   
    if (req.body.username == users[i].utente && 
        req.body.pass == users[i].password)
    {
       consentito = true;
       ruolo = users[i].ruolo;
    }
}

    if (consentito){
        if (ruolo == "amministratore"){
          req.session.username = req.body.username
          res.render('', {nome:"francesco", citta: "bologna"});
        }
        else{
         // 	res.render('', {nome:"francesco2", citta: "bologna2"});
          req.session.username = req.body.username
          res.redirect('home');
        }
      
    }
    else {res.send('<h1> accesso negato </h1>');};
  			
});

const fs = require('fs');
 let users;
 fs.readFile('users.json', (err, data) => {
    users = JSON.parse(data);
    if (err) throw err; 
    console.log(users);
    });
 /*   
app.post("/", function(req, res){ 
    console.log("Ricevuto una richiesta POST");
    // contenuto della richiesta
    console.log(req.body);
    // username
    console.log(req.body.username);
    // password
    console.log(req.body.pass);
    //aprire json e confrontarlo

   let consentito = false

    for (let i = 0; i < users.length; i++) 


  { 
   
    if (req.body.username == users[i].utente && 
        req.body.pass == users[i].password)
    {
       consentito = true;
       ruolo = users[i].ruolo;
    }
}

    if (consentito){
        if (ruolo == "amministatore"){
             res.sendFile(path.join(__dirname + '/public/new.html'));
        }
        else{
           res.sendFile(path.join(__dirname + '/public/item.html'  ));
         //res.render("item.html");
        }
      
    }
    else {res.send('<h1> accesso negato </h1>');};
   })
*/
module.exports = router;
