//=========================================================================
// Traitement de "req_jouer_solo"
// Auteur : Q.DESIMEUR
// Version : 17/11/2016
//=========================================================================

"use strict";

var fs = require("fs");
require('remedial');


var reponse1;
var reponse2;
var reponse3;
var reponse4;
var bonne_reponse;


var trait = function (req, res, query) {

    var page;

    // AFFICHAGE DE LA modele_jeu_solo

    page = fs.readFileSync('modele_jeu_solo.html', 'utf-8');

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
};

//--------------------------------------------------------------------------

module.exports = trait;
