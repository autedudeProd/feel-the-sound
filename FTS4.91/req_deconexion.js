//=========================================================================
//traitement de "req_deconexion"
//auteur : FTS
//date : 11/01/2017
//================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

    var contenu_fichier;
    var liste_membres;
    var page;
    var marqueurs;
    var i;
    // CHANGEMENT DE LA PHASE

    contenu_fichier = fs.readFileSync("info.json", "UTF-8");
    liste_membres = JSON.parse(contenu_fichier);

    for (i = 0; i < liste_membres.length; i++) {
        if (liste_membres[i].pseudo === query.pseudo) {
            liste_membres[i].phase = 0;
        }
    }
    contenu_fichier = JSON.stringify(liste_membres);
    fs.writeFileSync("info.json", contenu_fichier, "UTF-8");

    //AFFICHAGE DE LA PAGE

    page = fs.readFileSync('modele_accueil.html', 'utf-8');

    marqueurs = {};
    marqueurs.connecte = "";
    page = page.supplant(marqueurs);

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.write(page);
    res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;