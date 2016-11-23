//==============================================================================
// requete accueil membre 
// auteur : D.audinet
// 21/11/2016
//==============================================================================

"use strict";

var fs = require("fs");
require ('remedial');

var trait = function (req, res, query) {
	
	var marqueurs;
	var page;

	// AFFICHAGE DE LA PAGE D'ACCUEIL MEMBRE
	
	page = fs.readFileSync('modele_accueil_membre.html','utf-8');

	marqueurs = {};
	marqueurs.pseudo = "";
	page = page.supplent(marqueurs);

	res.writeHead(200, {'content-Type':'text/html'});
	res.write(page);
	res.end();
};
//==============================================================================

module.exports = trait;
