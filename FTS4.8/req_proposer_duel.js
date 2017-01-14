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
    var i;
    var contenu_fichier;
    var listeMembres;

    //CHANGEMENT DE PHASE 

    contenu_fichier = fs.readFileSync("info.json","UTF-8");
    listeMembres = JSON.parse(contenu_fichier);
			
	for(i=0; i<listeMembres.length ;i++) {
		if (listeMembres[i].pseudo === query.pseudo) {
			listeMembres[i].phase = 5;
            listeMembres[i].adv = query.adv;
            listeMembres[i].role = "defiant";
        }else if(listeMembres[i].connecte === query.defie) {
            listeMembres[i].phase = 6;
            listeMembres[i].adv = query.pseudo;
            listeMembres[i].role = "defie";    
        } 
    }
	contenu_fichier = JSON.stringify(listeMembres);
	fs.writeFileSync("info.json", contenu_fichier, "UTF-8");

 // AFFICHAGE DE LA PAGE D'ACCUEIL

    page = fs.readFileSync('modele_attente_duel.html', 'utf-8');

    marqueurs = {};
    marqueurs.pseudo = query.pseudo;
    page = page.supplant(marqueurs);

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
