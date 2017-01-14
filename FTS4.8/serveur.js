//=========================================================================
// Site WEB demo PI
// Auteur : FTS
// Version : 16/11/2016
//=========================================================================

"use strict";

var http = require("http");
var url = require("url");
var querystring = require("querystring");

//-------------------------------------------------------------------------
// DECLARATION DES DIFFERENTS MODULES CORRESPONDANT A CHAQUE ACTION
//-------------------------------------------------------------------------

var req_commencer = require("./req_commencer.js");
var req_afficher_formulaire_inscription = require("./req_afficher_formulaire_inscription.js");
var req_inscrire = require("./req_inscrire.js");
var req_identifier = require("./req_identifier.js");
var req_rappeler_regle = require("./req_rappeler_regle.js");
var req_jouer_solo = require("./req_jouer_solo.js");
var req_attendre_duel = require("./req_attendre_duel.js");
var req_quitter_attente = require("./req_quitter_attente.js");
var req_proposer_duel = require("./req_proposer_duel.js");
var req_verifier_reponse = require("./req_verifier_reponse.js");
var req_afficher_question = require("./req_afficher_question.js");
var req_accueil_membre = require("./req_accueil_membre.js");
var req_deconexion = require("./req_deconexion.js");
var req_attendre_reponse_duel = require("./req_attendre_reponse_duel.js");
var req_accepter_duel = require("./req_accepter_duel.js");

var req_static = require("./req_static.js");
var req_erreur = require("./req_erreur.js");

//-------------------------------------------------------------------------
// FONCTION DE CALLBACK APPELLEE POUR CHAQUE REQUETE
//-------------------------------------------------------------------------

var traite_requete = function (req, res) {

    var ressource;
    var requete;
    var pathname;;
    var query;

    console.log("URL reçue : " + req.url);
    requete = url.parse(req.url, true);
    pathname = requete.pathname;
    query = requete.query;

    // ROUTEUR

    try {
        switch (pathname) {
        case '/':
        case '/req_commencer':
            req_commencer(req, res, query);
            break;
        case '/req_afficher_formulaire_inscription':
            req_afficher_formulaire_inscription(req, res, query);
            break;
        case '/req_inscrire':
            req_inscrire(req, res, query);
            break;
        case '/req_identifier':
            req_identifier(req, res, query);
            break;
        case '/req_rappeler_regle':
            req_rappeler_regle(req, res, query);
            break;
        case '/req_jouer_solo':
            req_jouer_solo(req, res, query);
            break;
        case '/req_attendre_duel':
            req_attendre_duel(req, res, query);
            break;
        case '/req_quitter_attente':
            req_quitter_attente(req, res, query);
            break;
        case '/req_accueil_membre':
            req_accueil_membre(req, res, query);
            break;
        case '/req_proposer_duel':
            req_proposer_duel(req, res, query);
            break;
        case '/req_verifier_reponse':
            req_verifier_reponse(req, res, query);
            break;
        case '/req_afficher_question':
            req_afficher_question(req, res, query);
            break;
        case '/req_deconexion':
            req_deconexion(req, res, query);
            break;
        case '/req_attendre_reponse_duel':
            req_attendre_reponse_duel(req, res, query);
            break;
        case '/req_accepter_duel':
            req_accepter_duel(req, res, query);
            break;
        default:
            req_static(req, res, pathname);
            break;
        }
    } catch (e) {
        console.log('Erreur : ' + e.stack);
        console.log('Erreur : ' + e.message);
        //console.trace();
        req_erreur(req, res, query);
    }
};

//-------------------------------------------------------------------------
// CREATION ET LANCEMENT DU SERVEUR
//-------------------------------------------------------------------------

var mon_serveur = http.createServer(traite_requete);
var port = 5000;
console.log("Serveur en ecoute sur port " + port);
mon_serveur.listen(port);