//=========================================================================
// Traitement de "req_verifier_reponse"
// Auteur :FTS
// Version : 06/12/2016
//=========================================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

    var marqueurs;
    var page;
    var bonne_reponse;
    var contenu;
    var score;
    var fichier_duel;
    var j;
    var repondre;
    var i = [];
    var nb_questions;

    // ON RECUPERE LA VALEUR DE i DEPUIS LE FICHIER i.json CREE A PARTIR DE req_jouer_duel

    fichier_duel = JSON.parse(fs.readFileSync("duel/" + query.pseudo + "vs" + query.adv + ".json", "utf-8"));
    //=====================================================//

    contenu = JSON.parse(fs.readFileSync("questions_reponses.json", "utf-8"));

    j = Number(query.choix);
    if (contenu[fichier_duel.compteur].reponse === j) {
        fichier_duel.bonne_reponse++;
        nb_questions = Number(fichier_duel.bonne_reponse) + Number(fichier_duel.mauvaise_reponse);
        marqueurs = {};
        marqueurs.reponse = '<div class="alert alert-success" role="alert"><span class="glyphicon" glyphicon-exclamation-sign aria-hidden="true"></span><span class="sr-only">Error:</span>Bonne réponse !'

        marqueurs.score = " Votre score actuel est : " + fichier_duel.bonne_reponse + " point(s) sur " + nb_questions + " questions.</div>"

    } else {
        fichier_duel.mauvaise_reponse++;
        nb_questions = Number(fichier_duel.bonne_reponse) + Number(fichier_duel.mauvaise_reponse);
        marqueurs = {};
        marqueurs.reponse = '<div class="alert alert-danger" role="alert"><span class="glyphicon" glyphicon-exclamation-sign aria-hidden="true"></span><span class="sr-only">Error:</span>Mauvaise réponse'

        marqueurs.score = " Votre score actuel est : " + fichier_duel.bonne_reponse + " point(s) sur " + nb_questions + " questions.</div>";
    }



    i = JSON.stringify(fichier_duel);
    fs.writeFileSync("duel/" + query.pseudo + ".json", i, "utf-8");

    // AFFICHAGE DE LA PAGE 

    page = fs.readFileSync('modele_reponse_duel.html', 'utf-8');

    marqueurs.erreur = "";
    marqueurs.pseudo = query.pseudo;
    page = page.supplant(marqueurs);

    //=========================================================//

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.write(page);
    res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;