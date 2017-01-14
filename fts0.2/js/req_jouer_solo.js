//=========================================================================
// Traitement de "req_jouer_solo"
// Auteur : Q.DESIMEUR
// Version : 17/11/2016
//=========================================================================

"use strict";


var fs = require("fs");
require('remedial');


var trait = function (req, res, query) {


	var page;
	var reponse1;
	var reponse2;
	var reponse3;
	var reponse4;
	var contenu = {};		// fichier questions_reponses.json
	var bonne_reponse;
 

    // AFFICHAGE DE LA modele_jeu_solo

    page = fs.readFileSync('modele_jeu_solo.html', 'UTF-8');

	
	// LECTURE DU FICHIER questions_reponses.json

	bonne_reponse = fs.readFileSync("./questions_reponses.json","UTF-8");
	contenu = JSON.parse(bonne_reponse);
	page = page.supplant(contenu);	
	
	//==================================================================//

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();

};

//--------------------------------------------------------------------------

module.exports = trait;
