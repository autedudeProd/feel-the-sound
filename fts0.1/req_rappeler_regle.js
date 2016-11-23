//=========================================================================
// Traitement de "req_rappeler_regle"
// Auteur : Q.DESIMEUR
// Version : 16/11/2016
//=========================================================================


"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

var marqueurs;
var page;

// AFFICHAGE DE LA PAGE modele_rappel_regle.html

    page = fs.readFileSync('modele_rappel_regle.html', 'utf-8');

	marqueurs = {};
		marqueurs.pseudo = "";
		page = page.supplant(marqueurs);

		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(page);
		res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
