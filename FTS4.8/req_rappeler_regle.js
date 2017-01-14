//=========================================================================
// Traitement de "req_rappeler_regle"
// Auteur : T.DUPIN
// Version : 16/11/2016
//=========================================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

var listeMembres;
var contenu_fichier;
var marqueurs = {};
var page;
var i;
var contenu;
var open = {};

// CHANGEMENT DE LA PHASE

    contenu_fichier = fs.readFileSync("info.json","UTF-8");
	listeMembres = JSON.parse(contenu_fichier);
			
	for(i=0; i<listeMembres.length ;i++) {
		if (listeMembres[i].pseudo === query.pseudo) {
			listeMembres[i].phase = 3;
		}
	}
	contenu_fichier = JSON.stringify(listeMembres);
	fs.writeFileSync("info.json", contenu_fichier, "UTF-8");
	
	open.question = [];
    open.bonne_reponse = "0";
    open.compteur = "0";
	open.mauvaise_reponse ="0";

	open = JSON.stringify(open);
	fs.writeFileSync("solo/"+query.pseudo+".json",open,"utf-8");
            
// AFFICHAGE DE LA PAGE modele_rappel_regle.html

    page = fs.readFileSync('modele_rappel_regle.html', 'utf-8');

		marqueurs = {};
		marqueurs.pseudo = query.pseudo;
		page = page.supplant(marqueurs);

		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(page);
		res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
