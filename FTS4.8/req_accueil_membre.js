//=========================================================================
//traitement de "req_accueil_membre"
//auteur : FTS
//date : 19/12/2016
//================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {
	
	var i;
	var contenu_fichier;
	var liste_membres;
	var liste
	var page;
	var marqueurs;
	var contenu_solo;
	var solo;

// CHANGEMENT DE LA PHASE

    contenu_fichier = fs.readFileSync("info.json","UTF-8");
    liste_membres = JSON.parse(contenu_fichier);

    for(i=0; i<liste_membres.length ;i++) {
        if (liste_membres[i].pseudo === query.pseudo) {
            liste_membres[i].phase = 1;
        }
    }
    contenu_fichier = JSON.stringify(liste_membres);
    fs.writeFileSync("info.json", contenu_fichier, "UTF-8");

// REINITIALISATION DU SCORE DES FICHIERS SOLO
	contenu_solo = fs.readFileSync("solo/"+query.pseudo+".json","utf-8");
	solo = JSON.parse(contenu_solo);

	solo.bonne_reponse = 0;
	solo.mauvaise_reponse = 0;
	solo.compteur = 0;

	contenu_solo = JSON.stringify(solo);
	fs.writeFileSync("solo/"+query.pseudo+".json",contenu_solo,"utf-8");

//AFFICHAGE DE LA PAGE

	page = fs.readFileSync('modele_accueil_membre.html','utf-8');

		marqueurs = {};
        marqueurs.pseudo = query.pseudo;
		marqueurs.connecte = "";
        page = page.supplant(marqueurs);

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(page);
        res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
                          
