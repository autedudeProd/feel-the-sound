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
    var liste = [];
    var i;
    var membre_connecte;

    
    liste = fs.readFileSync('info.json','utf-8');
    membre_connecte = JSON.parse(liste);

   // AFFICHAGE DE LA PAGE modele_attente_duel

    page = fs.readFileSync('modele_accueil_membre.html', 'utf-8');

    marqueurs = {};
    marqueurs.erreur = "";
    marqueurs.pseudo = query.pseudo;
    marqueurs.connecte = "";

    console.log(membre_connecte[0].pseudo);

    // AFFICHAGE DES MEMBRES CONNECTES A L'AIDE DU FICHIER info.json 

    for(i=0; i<membre_connecte.length; i++) {
        if(membre_connecte[i].pseudo !== query.pseudo) {
            marqueurs.connecte += "<li>" + membre_connecte[i].pseudo + "</li>";  
        }
        console.log(marqueurs.pseudo); 
    }
    page = page.supplant(marqueurs);

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
};

//--------------------------------------------------------------------------

module.exports = trait;
