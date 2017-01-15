//=========================================================================
// Traitement de "req_afficher_question"
// Auteur :FTS
// Version : 19/12/2016
//=========================================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

    var z;
    var liste;
    var i;
    var r = "";
    var sauvegarde;
    var page;
    var contenu;
    var j;
    var flag;
    var marqueurs = {};

    // LECTURE DES QUESTIONS / REPONSES

    sauvegarde = fs.readFileSync("questions_reponses.json", "utf-8");
    liste = JSON.parse(sauvegarde);

    contenu = JSON.parse(fs.readFileSync("duel/" + query.pseudo + "vs" + query.adv + ".json", "utf-8"));
    //Si on atteint X  question on renvoit la page de score
    if (contenu.compteur === 14) {
        page = fs.readFileSync('modele_score_duel.html', 'utf-8');
        marqueurs = {};
        marqueurs.pseudo = query.pseudo;
        marqueurs.score = "Bravo tu as finis la série, tu as obtenus " + contenu.bonne_reponse + " bonne(s) réponse(s) sur " + Number(contenu.compteur + 1) + " questions au total";

    } else {
        marqueurs = {};
        console.log(contenu.compteur);
        contenu.compteur++;
        marqueurs.question = liste[contenu.compteur].question;

        r = JSON.stringify(contenu);
        fs.writeFileSync("duel/" + query.pseudo + "vs" + query.adv + ".json", r, "utf-8");

        // AFFICHAGE DE modele_jeu_duel

        page = fs.readFileSync('modele_jeu_duel.html', 'UTF-8');
        marqueurs.prop = "";
        marqueurs.music = "";

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
    }
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