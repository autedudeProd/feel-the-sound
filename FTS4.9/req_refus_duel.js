//=========================================================================
//traitement de "req_refus_duel"
//auteur : FTS
//date : 14/01/2017
//================================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

    var marqueurs;
    var page;
    var i;
    var contenu_fichier;
    var listeMembres;

    // CHANGEMENT DE PHASE DU JOUEUR

    contenu_fichier = fs.readFileSync("info.json", "UTF-8");
    listeMembres = JSON.parse(contenu_fichier);

    for (i = 0; i < listeMembres.length; i++) {
        if (listeMembres[i].pseudo === query.pseudo) {
            listeMembres[i].phase = 1;
        }
    }

    contenu_fichier = JSON.stringify(listeMembres);
    fs.writeFileSync("info.json", contenu_fichier, "UTF-8");

    //AFFICHAGE DE LA PAGE

    page = fs.readFileSync('modele_accueil_membre.html', 'utf-8');

    marqueurs = {};
    marqueurs.pseudo = query.pseudo;
    marqueurs.connecte = "";
    page = page.supplant(marqueurs);

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.write(page);
    res.end();
};

//---------------------------------------------------------------------------

module.exports = trait;