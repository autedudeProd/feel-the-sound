//=========================================================================
// Traitement de "req_choisir_duel"
// Auteur : FTS
// Version : 20/12/2016
//=========================================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

    var marqueurs;
    var page;
	var sauvegarde;
	var liste;
	var j;
	var d;
	var u;
	var y;
    var i;
    var contenu_fichier;
    var listeMembres;
    var open = {};

    //CHANGEMENT DE PHASE 

    contenu_fichier = fs.readFileSync("info.json", "UTF-8");
    listeMembres = JSON.parse(contenu_fichier);

    for (i = 0; i < listeMembres.length; i++) {
        if (listeMembres[i].pseudo === query.pseudo) {
            listeMembres[i].phase = 5;
            listeMembres[i].adv = query.adv;
            listeMembres[i].role = "defiant";
        } else if (listeMembres[i].connecte === query.defie) {
            listeMembres[i].phase = 6;
            listeMembres[i].adv = query.pseudo;
            listeMembres[i].role = "defie";
        }
    }
  // AFFICHAGE QUESTIONS / REPONSES

    sauvegarde = fs.readFileSync("questions_reponses.json", "utf-8");
    liste = JSON.parse(sauvegarde);

    // MELANGE DES QUESTIONS

    for (j = 0; j < 41; j++) {
        u = Math.floor(Math.random() * (liste.length));
        d = liste[u];
        i = Math.floor(Math.random() * (liste.length));
        y = liste[i];
        liste[i] = d;
        liste[u] = y;
    }
    d = JSON.stringify([liste[0],liste[1],liste[2],liste[3],liste[4],liste[5],liste[6],liste[7],liste[8],liste[9],liste[10],liste[11],liste[12],liste[13],liste[14],liste[15],liste[16],liste[17]]);
    fs.writeFileSync("duel/" + query.pseudo + "vs" + query.adv + ".json",d, "utf-8");

    contenu_fichier = JSON.stringify(listeMembres);
    fs.writeFileSync("info.json", contenu_fichier, "UTF-8");

    // AFFICHAGE DE LA PAGE

    page = fs.readFileSync('modele_attente_duel.html', 'utf-8');

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
//--------------------------------------------------------------------------

module.exports = trait;
