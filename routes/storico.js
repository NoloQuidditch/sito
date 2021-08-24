var express = require('express');
var router = express.Router();
var session = require('express-session');
var moment = require('moment');
const fs = require('fs');

router.get('/',function(req, res, next){
	console.log(req.session.username);

 	let users = JSON.parse(fs.readFileSync('users.json'));
 
	let ordiniUtente = [];

	let ruolo;

	for (let i = 0; i < users.length; i++){
	 	if( users[i].utente== req.session.username){
			ruolo = users[i].ruolo
		}
	}


 	if (ruolo == 'amministratore'){
 		for (let i = 0; i < users.length; i++){
 			try {
					let ordini = JSON.parse(fs.readFileSync(users[i].utente + '.json'));
		 			 for (let i = 0; i < ordini.length; i++){
						ordiniUtente.push(ordini[i]);
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
	 	
	 	} else{

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
	 	}
    res.render('storico', {orders: ordiniUtente});
});

module.exports = router;