//=========================================================================
// Traitement de "req_quitter_attente"
// Auteur : T.DUPIN
// Version : 1/12/2016
//=========================================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

    var i;
    var membre_connecte;
    var listeMembres;
    var contenu_fichier;
    var marqueurs;
    var page;

    // CHANGEMENT DE LA PHASE

    contenu_fichier = fs.readFileSync("info.json", "UTF-8");
    listeMembres = JSON.parse(contenu_fichier);

    for (i = 0; i < listeMembres.length; i++) {
        if (listeMembres[i].pseudo === query.pseudo) {
            listeMembres[i].phase = 1;
        }
    }

    contenu_fichier = JSON.stringify(listeMembres);
    fs.writeFileSync("info.json", contenu_fichier, "UTF-8");

    // AFFICHAGE DE LA PAGE  modele_accueil_membre.html

    page = fs.readFileSync('modele_accueil_membre.html', 'utf-8');

    marqueurs = {};
    marqueurs.erreur = "";
    marqueurs.pseudo = query.pseudo;
    page = page.supplant(marqueurs);

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.write(page);
    res.end();
};

//--------------------------------------------------------------------------

module.exports = trait;