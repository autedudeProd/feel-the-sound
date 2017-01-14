//=========================================================================
// Traitement de "req_attendre_defi"
// Auteur : FTS
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
    var j;
    var membre_connecte = [];
    var listeMembres;
    var contenu_fichier;


    contenu_fichier = fs.readFileSync("info.json", "UTF-8");
    listeMembres = JSON.parse(contenu_fichier);

    // TEST POUR SAVOIR ON EST DEFIE

    for (j = 0; j < listeMembres.length; j++) {
        if (listeMembres[j].pseudo === query.pseudo) {
            if (listeMembres[j].phase === 6) {
                console.log("je suis defie");
                page = fs.readFileSync('modele_choix_accept_refus.html', 'utf-8');

                marqueurs = {};
                marqueurs.pseudo = query.pseudo;
                page = page.supplant(marqueurs);

                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                res.write(page);
                res.end();
            } else {

                liste = fs.readFileSync('info.json', 'utf-8');
                membre_connecte = JSON.parse(liste);


                // si l'on est pas defie AFFICHAGE DE LA PAGE modele_attente_duel

                page = fs.readFileSync('modele_accueil_membre.html', 'utf-8');

                marqueurs = {};
                marqueurs.erreur = "";
                marqueurs.pseudo = query.pseudo;
                marqueurs.connecte = "";

                console.log(membre_connecte[0].pseudo);

                // AFFICHAGE DES MEMBRES CONNECTES A L'AIDE DU FICHIER info.json 

                for (i = 0; i < membre_connecte.length; i++) {
                    if (membre_connecte[i].pseudo !== query.pseudo) {
                        if (membre_connecte[i].phase === 1) {
                            marqueurs.connecte += "<a href=/req_proposer_duel?pseudo=" + query.pseudo + "&adv=" + membre_connecte[i].pseudo + ">" + membre_connecte[i].pseudo + "</a>";

                        }
                    }

                    // console.log(marqueurs.pseudo);
                }

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

//--------------------------------------------------------------------------

module.exports = trait;