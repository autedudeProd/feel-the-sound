//=========================================================================
// Traitement de "req_identifier"
// Auteur : Q.DESIMEUR
// Version : 15/11/2016
//=========================================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

    var marqueurs;
    var pseudo;
    var password;
    var page;
    var membre;
    var contenu_fichier;
    var listeMembres;
	var membre_connecte;
    var i;
    var trouve;
	var joueur;


    // ON LIT LES COMPTES EXISTANTS

    contenu_fichier = fs.readFileSync("membres.json", 'utf-8');    
    listeMembres = JSON.parse(contenu_fichier);

    // ON VERIFIE QUE LE PSEUDO/PASSWORD EXISTE

    trouve = false;
    i = 0;
    while(i<listeMembres.length && trouve === false) {
        if(listeMembres[i].pseudo === query.pseudo) {
            if(listeMembres[i].password === query.password) {
                trouve = true;
            }	
    	}
		i++;	
	}

    // ON RENVOIT UNE PAGE HTML 

    if(trouve === false) {
        // SI IDENTIFICATION INCORRECTE, ON REAFFICHE PAGE ACCUEIL AVEC ERREUR
		
        page = fs.readFileSync('modele_accueil.html', 'utf-8');
	
        marqueurs = {};
        marqueurs.erreur = "ERREUR : compte ou mot de passe incorrect";
        marqueurs.pseudo = query.pseudo;
        page = page.supplant(marqueurs);

    } else {

		// ON LIT LE FICHIER info.json AFIN DE DEFINIR LE STATUT DES JOUEURS
		
			contenu_fichier = fs.readFileSync("info.json","UTF-8");
			listeMembres = JSON.parse(contenu_fichier);
			
			membre_connecte = {};
			membre_connecte.pseudo = query.pseudo;
			membre_connecte.phase = 1;
			
			listeMembres[listeMembres.length] = membre_connecte;

			contenu_fichier = JSON.stringify(listeMembres);
			fs.writeFileSync("info.json", contenu_fichier, "UTF-8");
					

      // SI IDENTIFICATION OK, ON ENVOIE PAGE ACCUEIL MEMBRE

            page = fs.readFileSync('modele_accueil_membre.html', 'UTF-8');
		
            marqueurs = {};
            marqueurs.pseudo = query.pseudo;
            page = page.supplant(marqueurs);
		
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
};

//---------------------------------------------------------------------------

module.exports = trait;
