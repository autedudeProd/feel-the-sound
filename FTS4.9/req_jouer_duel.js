//=========================================================================
// Traitement de "req_jouer_duel"
// Auteur : fts
// Version : 30/11/2016
//=========================================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

    var page;
    var listeMembres;
    var contenu;
    var r = "";
    var contenu_fichier; // fichier info.json pour déterminer la phase
    var sauvegarde; // fichier questions_reponses.json
    var liste = [];
    var question;
    var i; //Numéro de la question
    var j;
    var d;
    var u;
    var y;
    var compteur;
    var marqueurs = {};
    var reponse; // Bonne réponse

    // CHANGEMENT DE LA PHASE (RAPPEL => 0=deco, 1=dispo, 2=indispo, 3=en jeu)

    contenu_fichier = fs.readFileSync("info.json", "UTF-8");
    listeMembres = JSON.parse(contenu_fichier);

    for (i = 0; i < listeMembres.length; i++) {
        if (listeMembres[i].pseudo === query.pseudo) {
            listeMembres[i].phase = 3;
        }
    }
    contenu_fichier = JSON.stringify(listeMembres);
    fs.writeFileSync("info.json", contenu_fichier, "UTF-8");

    // AFFICHAGE QUESTIONS / REPONSES

    sauvegarde = fs.readFileSync("questions_reponses.json", "utf-8");
    liste = JSON.parse(sauvegarde);

    // MELANGE DES QUESTIONS

    for (j = 0; j < 41; j++) {
        u = Math.floor(Math.random() * (liste.length));
        console.log(u);
        d = liste[u];
        i = Math.floor(Math.random() * (liste.length));
        console.log(i);
        y = liste[i];
        liste[i] = d;
        liste[u] = y;
    }
    d = JSON.stringify(liste);
    fs.writeFileSync("questions_reponses.json", d, "utf-8");

    console.log(liste);
    contenu = JSON.parse(fs.readFileSync("duel/" + query.pseudo + "vs" + query.adv + ".json", "utf-8"));

    // ON STOCK LE NUMERO DE LA QUESTION ON UTILISE DANS UN AUTRE FICHIER

    marqueurs = {};
    console.log(contenu.compteur);
    marqueurs.question = liste[contenu.compteur].question;

    r = JSON.stringify(contenu);
    fs.writeFileSync("duel/" + query.pseudo + "vs" + query.adv + ".json", r, "utf-8");

    // AFFICHAGE DE LA modele_jeu_duel

    page = fs.readFileSync('modele_jeu_duel.html', 'UTF-8');
    marqueurs.prop = "";

    // ON INTEGRE LES MP3 AUX QUESTIONS
    console.log(liste[contenu.compteur].num_question + 1);
    liste[contenu.compteur].num_question = Number(liste[contenu.compteur].num_question);
    if (liste[contenu.compteur].num_question === 0) {
        marqueurs.music = '<embed src="/media/Titanium.mp3"autostart="true" loop="false" hidden="true"></embed>';
    } else if (liste[contenu.compteur].num_question === 1) {
        marqueurs.music = '<embed src="/media/Starlight.mp3"autostart="true" loop="false" hidden="true"></embed>';
    } else if (liste[contenu.compteur].num_question === 2) {
        marqueurs.music = '<embed src="/media/NoBravery.mp3"autostart="true" loop="false" hidden="true"></embed>';
    } else if (liste[contenu.compteur].num_question === 3) {
        marqueurs.music = '<embed src="/media/Paradise.mp3"autostart="true" loop="false" hidden="true"></embed>';
    } else if (liste[contenu.compteur].num_question === 4) {
        marqueurs.music = '<embed src="/media/LetHerGo.mp3"autostart="true" loop="false" hidden="true"></embed>';
    } else if (liste[contenu.compteur].num_question === 5) {
        marqueurs.music = '<embed src="/media/TheyDontCareAboutUs.mp3"autostart="true" loop="false" hidden="true"></embed>';
    } else if (liste[contenu.compteur].num_question === 6) {
        marqueurs.music = '<embed src="/media/TogetherAgain.mp3"autostart="true" loop="false" hidden="true"></embed>';
    } else if (liste[contenu.compteur].num_question === 7) {
        marqueurs.music = '<embed src="/media/Ouioui.mp3"autostart="true" loop="false" hidden="true"></embed>';
    } else if (liste[contenu.compteur].num_question === 8) {
        marqueurs.music = '<embed src="/media/alwaysonmymind.mp3"autostart="true" loop="false" hidden="true"></embed>';
    } else if (liste[contenu.compteur].num_question === 9) {
        marqueurs.music = '<embed src="/media/InTheEnd.mp3"autostart="true" loop="false" hidden="true"></embed>';
    } else if (liste[contenu.compteur].num_question === 10) {
        marqueurs.music = '<embed src="/media/DontStopMeNow.mp3"autostart="true" loop="false" hidden="true"></embed>';
    } else if (liste[contenu.compteur].num_question === 11) {
        marqueurs.music = '<embed src="/media/SundayBloody.mp3"autostart="true" loop="false" hidden="true"></embed>';
    } else if (liste[contenu.compteur].num_question === 12) {
        marqueurs.music = '<embed src="/media/PumpIt.mp3"autostart="true" loop="false" hidden="true"></embed>';
    } else if (liste[contenu.compteur].num_question === 13) {
        marqueurs.music = '<embed src="/media/NeMeQuittePas.mp3"autostart="true" loop="false" hidden="true"></embed>';
    } else if (liste[contenu.compteur].num_question === 14) {
        marqueurs.music = '<embed src="/media/JurassikPark.mp3"autostart="true" loop="false" hidden="true"></embed>';
    } else if (liste[contenu.compteur].num_question === 15) {
        marqueurs.music = '<embed src="/media/JimiHendrix.mp3"autostart="true" loop="false" hidden="true"></embed>';
    } else if (liste[contenu.compteur].num_question === 16) {
        marqueurs.music = '<embed src="/media/HighwayToHell.mp3"autostart="true" loop="false" hidden="true"></embed>';
    } else if (liste[contenu.compteur].num_question === 17) {
        marqueurs.music = '<embed src="/media/Gladiator.mp3"autostart="true" loop="false" hidden="true"></embed>';
    } else if (liste[contenu.compteur].num_question === 18) {
        marqueurs.music = '<embed src="/media/ET.mp3"autostart="true" loop="false" hidden="true"></embed>';
    } else if (liste[contenu.compteur].num_question === 19) {
        marqueurs.music = '<embed src="/media/GetRight.mp3"autostart="true" loop="false" hidden="true"></embed>';
    } else if (liste[contenu.compteur].num_question === 20) {
        marqueurs.music = '<embed src="/media/TomberLaChemise.mp3"autostart="true" loop="false" hidden="true"></embed>';
    } else if (liste[contenu.compteur].num_question === 21) {
        marqueurs.music = '<embed src="/media/WorkFromHome.mp3"autostart="true" loop="false" hidden="true"></embed>';
    } else if (liste[contenu.compteur].num_question === 22) {
        marqueurs.music = '<embed src="/media/WeDontTalkAnymore.mp3"autostart="true" loop="false" hidden="true"></embed>';
    } else if (liste[contenu.compteur].num_question === 23) {
        marqueurs.music = '<embed src="/media/TreatYouBetter.mp3"autostart="true" loop="false" hidden="true"></embed>';
    } else if (liste[contenu.compteur].num_question === 24) {
        marqueurs.music = '<embed src="/media/TimeToMove.mp3"autostart="true" loop="false" hidden="true"></embed>';
    } else if (liste[contenu.compteur].num_question === 25) {
        marqueurs.music = '<embed src="/media/ThisOnesForYou.mp3"autostart="true" loop="false" hidden="true"></embed>';
    } else if (liste[contenu.compteur].num_question === 26) {
        marqueurs.music = '<embed src="/media/ThisIsWhatYouCameFor.mp3"autostart="true" loop="false" hidden="true"></embed>';
    } else if (liste[contenu.compteur].num_question === 27) {
        marqueurs.music = '<embed src="/media/Starboy.mp3"autostart="true" loop="false" hidden="true"></embed>';
    } else if (liste[contenu.compteur].num_question === 28) {
        marqueurs.music = '<embed src="/media/SideToSide.mp3"autostart="true" loop="false" hidden="true"></embed>';
    } else if (liste[contenu.compteur].num_question === 29) {
        marqueurs.music = '<embed src="/media/SayYouWontLetGo.mp3"autostart="true" loop="false" hidden="true"></embed>';
    } else if (liste[contenu.compteur].num_question === 30) {
        marqueurs.music = '<embed src="/media/Mercy.mp3"autostart="true" loop="false" hidden="true"></embed>';
    } else if (liste[contenu.compteur].num_question === 31) {
        marqueurs.music = '<embed src="/media/LightMyFire.mp3"autostart="true" loop="false" hidden="true"></embed>';
    } else if (liste[contenu.compteur].num_question === 32) {
        marqueurs.music = '<embed src="/media/LetMeLoveYou.mp3"autostart="true" loop="false" hidden="true"></embed>';
    } else if (liste[contenu.compteur].num_question === 33) {
        marqueurs.music = '<embed src="/media/InTheNameOfLove.mp3"autostart="true" loop="false" hidden="true"></embed>';
    } else if (liste[contenu.compteur].num_question === 34) {
        marqueurs.music = '<embed src="/media/InTheArmyNow.mp3"autostart="true" loop="false" hidden="true"></embed>';
    } else if (liste[contenu.compteur].num_question === 35) {
        marqueurs.music = '<embed src="/media/Heathens.mp3"autostart="true" loop="false" hidden="true"></embed>';
    } else if (liste[contenu.compteur].num_question === 36) {
        marqueurs.music = '<embed src="/media/Grey.mp3"autostart="true" loop="false" hidden="true"></embed>';
    } else if (liste[contenu.compteur].num_question === 37) {
        marqueurs.music = '<embed src="/media/DontWannaKnow.mp3"autostart="true" loop="false" hidden="true"></embed>';
    } else if (liste[contenu.compteur].num_question === 38) {
        marqueurs.music = '<embed src="/media/DontLetMeDown.mp3"autostart="true" loop="false" hidden="true"></embed>';
    } else if (liste[contenu.compteur].num_question === 39) {
        marqueurs.music = '<embed src="/media/ColdWater.mp3"autostart="true" loop="false" hidden="true"></embed>';
    } else if (liste[contenu.compteur].num_question === 40) {
        marqueurs.music = '<embed src="/media/CheapThrillsRap.mp3"autostart="true" loop="false" hidden="true"></embed>';
    } else if (liste[contenu.compteur].num_question === 41) {
        marqueurs.music = '<embed src="/media/AllWeKnow.mp3"autostart="true" loop="false" hidden="true"></embed>';
    }

    // ON AFFICHE LES PROPOSITIONS (PROP)

    for (j = 0; j < liste[contenu.compteur].prop.length; j++) {
        console.log();
        marqueurs.prop += '<a href="/req_verifier_reponse?pseudo=' + query.pseudo + '&choix=' + j + '">\n <button type="button" class="btn btn-default" name="choix" value={' + j + '}>' + liste[contenu.compteur].prop[j] + "</button>";

    }

    marqueurs.pseudo = query.pseudo;
    marqueurs.reponse = "";
    page = page.supplant(marqueurs);

    //==================================================================//

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.write(page);
    res.end();

};

//--------------------------------------------------------------------------

module.exports = trait;