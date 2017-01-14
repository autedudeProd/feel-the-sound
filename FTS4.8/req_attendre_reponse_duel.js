//=========================================================================
// Traitement de "req_choisir_duel"
// Auteur : FTS
// Version : 29/11/2016
//=========================================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

    var marqueurs;
    var page;
    var i;
    var contenu_fichier;
    var listeMembres;
    var adv = query.adv;
    var phase;

    // RESULTAT DE LA REPONSE

    contenu_fichier = fs.readFileSync("info.json", "UTF-8");
    listeMembres = JSON.parse(contenu_fichier);

    for (i = 0; i < listeMembres.length; i++) {
        if (listeMembres[i].pseudo === query.adv) {

            adv = listeMembres[i].adv;
            phase = listeMembres[i].phase;
            console.log("j'ai reconnu l'adversaire c'est " + adv);
            console.log("sa phase de jeu est " + phase);

            if (listeMembres[i].phase === 3) {

                console.log("on jou le duel");

                page = fs.readFileSync('modele_jeu_duel.html', 'utf-8');

                marqueurs = {};
                marqueurs.pseudo = query.pseudo;
                page = page.supplant(marqueurs);

                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                res.write(page);
                res.end;

            } else if (listeMembres[i].phase === 1) {

                console.log("mon adv a refuser le defie");

                page = fs.readFileSync('modele_refus_duel.html', 'utf-8');

                marqueurs = {};

                marqueurs.pseudo = query.pseudo;
                page = page.supplant(marqueurs);

                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                res.write(page);
                res.end();

            } else {

                console.log("j'attends sa reponse")

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

            }
        }
    }

};

//-------------------------------------------------------------------------

module.exports = trait;