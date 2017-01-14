//=========================================================================
// Traitement de "req_attendre_defi"
// Auteur : Q.DESIMEUR
// Version : 21/11/2016
//=========================================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

    var marqueurs;
    var page;

    // AFFICHAGE DE LA PAGE modele_attente_duel

    page = fs.readFileSync('modele_attente_duel.html', 'utf-8');

    marqueurs = {};
    marqueurs.erreur = "";
    marqueurs.pseudo = "";
    marqueurs.liste = "";
    page = page.supplant(marqueurs);

    for(i=0; i<liste.length; i++) {
        liste = []
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
};

//--------------------------------------------------------------------------

module.exports = trait;
