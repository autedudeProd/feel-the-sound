//=========================================================================
// Traitement de "req_choisir_duel"
// Auteur : FTS
// Version : 29/11/2016
//=========================================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

    var contenu_fichier;
    var listeMembres;
    var i;
    var marqueurs;
    var page;

    console.log("j'accepte le defie")

    // CHANGEMENT DE PHASE

    contenu_fichier = fs.readFileSync("info.json", "UTF-8");
    listeMembres = JSON.parse(contenu_fichier);

    for (i = 0; i < listeMembres.length; i++) {
        if (listeMembres[i].pseudo === query.pseudo) {
            listeMembres[i].phase = 3;
        }
    }

    contenu_fichier = JSON.stringify(listeMembres);
    fs.writeFileSync("info.json", contenu_fichier, "UTF-8");

    // AFFICHAGE DE LA PAGE

    page = fs.readFileSync('modele_jeu_duel.html', 'utf-8');

    marqueurs = {};
    marqueurs.pseudo = query.pseudo;
    marqueurs.adv = query.adv;
    page = page.supplant(marqueurs);

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.write(page);
    res.end();

};

//---------------------------------------------------------------------------

module.exports = trait;