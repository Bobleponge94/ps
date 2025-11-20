var Cookie = {
    creer: function (h, i) {
        var g = this.creer.arguments;
        var e = this.creer.arguments.length;
        var d = (e > 2) ? g[2] : null;
        var j = (e > 3) ? g[3] : null;
        var f = (e > 4) ? g[4] : null;
        var c = (e > 5) ? g[5] : false;
        var a = h + "=" + escape(i) + ((d == null || d == "") ? "" : ("; expires=" + d.toGMTString())) + ((j == null) ? "" : ("; path=" + j)) + ((f == null) ? "" : ("; domain=" + f)) + ((c == true) ? "; secure" : "");
        document.cookie = a
    },
    getValeur: function (c) {
        var a = document.cookie.indexOf(";", c);
        if (a == -1) {
            a = document.cookie.length
        }
        return unescape(document.cookie.substring(c, a))
    },
    lire: function (d) {
        var c = d + "=";
        var g = c.length;
        var a = document.cookie.length;
        var f = 0;
        while (f < a) {
            var e = f + g;
            if (document.cookie.substring(f, e) == c) {
                return this.getValeur(e)
            }
            f = document.cookie.indexOf(" ", f) + 1;
            if (f == 0) {
                break
            }
        }
        return null
    }
};

var f = {
    mobileIOS: "9241",
    mobileAndroid: "9240",
    tabletteIOS: "9251",
    tabletteAndroid: "9250",
    deviceIOS: ["9241", "9251"],
    deviceAndroid: ["9240", "9250"],
};
var j = {
    android: [{
        digit1: 5,
        op1: "<=",
        digit2: 10,
        op2: "<=",
        origin: "tactile"
    }, {
        digit1: 6,
        op1: "=",
        digit2: 5,
        op2: "<",
        origin: "tactile"
    }],
    ios: [{
        digit1: 6,
        op1: "<=",
        digit2: 4,
        op2: "<=",
        origin: "tactile"
    }],
};

const msgRG002 = "Votre mot de passe est incomplet";

function eventPsw(e) {
    //rÃ¨gles de gestion des messages d'erreur accessibilitÃ©
    if ( (e.detail.action === 'digit') || (e.detail.action === 'reset') ) {

        var $rg002 = JQ.$("[data-tb-form-id*='motdepasse'] [data-ad-message*='RG002'] span");
        $rg002.html("Votre mot de passe est incomplet.");
        var rg002hidden = document.getElementById("motdepasse-RG002");
        var rg002AN = rg002hidden.getElementsByClassName("visually-hidden access-text")[0];
        rg002AN.innerHTML = msgRG002;
    }
}

function controlIdentifiant() {
    tbErreurService.resetMessages();
    var id = document.getElementById("identifiant").value;
    if (id.length != 10) {
        tbErreurService.setMessage({field: 'identifiant', rg: (id.length === 0) ? 'RG001' : 'RG002'});
    }
    tbErreurService.validateFormFields();
    return (id.length === 10) ? true : false;
}

function submitFormulaire() {
    //pour empÃªcher que le formulaire parte en erreur sur double-clic on dÃ©sactive le bouton au 1er clic
    var boutonConnexion = document.getElementById("btnConnexion");
    boutonConnexion.disabled = true;

    tbErreurService.resetMessages();

    var id = document.getElementById("identifiant").value;
    if (id.length != 10) {
        tbErreurService.setMessage({field: 'identifiant', rg: (id.length === 0) ? 'RG001' : 'RG002'});
    }

    var psw = document.getElementById("password").value;
    if (psw.length != 6) {
        tbErreurService.setMessage({field: 'password', rg: (psw.length === 0) ? 'RG001' : 'RG002'});
        if (psw.length > 0) {
            var $rg002 = JQ.$("[data-tb-form-id*='motdepasse'] [data-ad-message*='RG002'] .visually-hidden");
            var anHTML = ", fournir les " + (6-psw.length) + " derniers chiffres";
            if (psw.length === 5) {
                $rg002.html(msgRG002 + ", fournir le dernier chiffre");
            } else {
                    $rg002.html(msgRG002 + anHTML);
            }
        }
    }

    tbErreurService.validateFormFields({invalid: false});

    if (id.length === 10 && psw.length === 6) {

        //si les controles sont bons on rÃ©cupÃ¨re la valeur de l'id entrÃ©
        var value = document.getElementById("identifiant").value;
        var memoriserCheck = document.getElementById("check");
        if (memoriserCheck) {
            //si la case "cookie" est cochÃ©e et que la valeur de l'id ne contient pas d'Ã©toile, on crÃ©e un cookie.
            if (memoriserCheck.checked) {
                if (value && value.indexOf('*') < 0) {
                    var dateMemo = new Date();
                    dateMemo.setTime(dateMemo.getTime() + 5184000000);
                    try {
                        Cookie.creer("CVS_DONNEE_MEMO", id, dateMemo, "/", document.domain);
                    } catch (c) {
                        console.log("erreur lors de la sauvegarde de l'identifiant")
                    }
                }
            } else {
                effacerIdMemorise()
            }
        }
        tbLoader2Service.show({message1: "Chargement", message2: "Un petit instant"});
        // on envoie le formulaire si tout le traitement est bon
            setTimeout(function () {
                window.document.forms.formAccesCompte.submit();
            }, 500);
        //on reactive le bouton juste aprÃ¨s l'envoi du formulaire
        setTimeout(function () {
            boutonConnexion.disabled = false;
        }, 500);
        setTimeout(function () {
            tbLoader2Service.hide();
        }, 5000);
        return;
    }
    boutonConnexion.disabled = false;
}

function effacerIdMemorise() {
    try {
        var date = new Date();
        date.setTime(date.getTime() - 1);
        Cookie.creer("CVS_DONNEE_MEMO", "", date, "/", document.domain)
    } catch (b) {
        console.log("erreur lors de la suppression l'identifiant sauvegard?")
    }
}

function continuer() {
    if (controlIdentifiant() === true) {
        JQ.$('main *').removeClass('tb-volet-hidden');
        JQ.$("#label-password").focus();
        JQ.$('#btnContinuer').addClass('tb-volet-hidden');

    }
}

function afficherPopInSuiviBudget() {
    var b = "La fonctionnalit\u00e9 'Suivi budget' n'\u00e9tant pas conforme avec la 2e Directive des Services de Paiements (DSP2), nous avons d\u00e9cid\u00e9 de la supprimer. La Banque Postale \u00e9tudie la possibilit\u00e9 de se doter d'une solution plus adapt\u00e9e, qui respecte la r\u00e9glementation DSP2. La suppression de Suivi budget entra\u00eenera la suppression de l'ensemble de vos donn\u00e9es.";
    document.getElementById("ecran").hidden = true;
    main = document.getElementsByTagName("main")[0];
    var divPopIn = document.createElement("div");
    divPopIn.style.height = '446px';
    divPopIn.style.margin = 'auto';
    divPopIn.style.textAlign = 'center';
    divPopIn.style.width = '278px';
    var img = document.createElement("img");
    img.src = '' + PATH_JS + 'img/logoLBP.png';
    img.title = "Logo LBP";
    divPopIn.append(img);
    var message = document.createElement("p");
    message.append(b);
    divPopIn.append(message);
    main.append(divPopIn);
}


function IdReset() {
    //si l'utilisateur clique sur la croix de reset quand il y a un cookie,
    // on prend la valeur de l'input identifiant pour faire partir le formulaire
    var id_cookie = document.getElementById("id_cookie");
    id_cookie.removeAttribute('name');
    var identifiant = document.getElementById("identifiant");
    identifiant.setAttribute('name', "username");
}

JQ.$(document).ready(function () {

    var origin = document.getElementsByName("origin")[0].value;

    if (origin === "particuliers" || origin === "professionnels") {
        var resizer = document.createElement("script");
        resizer.type = 'text/javascript';
        resizer.src = '' + PATH_RESIZER + '/iframeresizer-contentWindow-4-3-2.min.js';
        document.body.appendChild(resizer);
    }

    if (OST_origin === "widget2") {
        afficherPopInSuiviBudget()
    }

    //si l'origin est tpp on ajoute le logo de LBP au dessus du cvd
    if(origin === "tpp"){
        var ecran = document.getElementById("ecran");
        var img = document.createElement("img");
        img.src= '' + PATH_JS + '/img/logo-lbp.svg';
        img.title= "Logo La Banque Postale";
        img.style.display= "block";
        img.style.margin = "auto";
        img.style.width = "15%";
        img.style.maxWidth = "150px";
        img.style.maxHeight = "150px";
        img.style.paddingBottom = "10px";
        ecran.insertBefore(img, ecran.firstChild);
    }

    //si le bouton back du navigateur est cliquÃ© on recharge la page
        var navigation = performance.getEntriesByType("navigation");
        if (Array.isArray(navigation) && (navigation.length > 0) && (navigation[0])) {
            var historyTraversal = performance.getEntriesByType("navigation")[0]['type'] === 'back_forward';
            if (historyTraversal) {
                window.location.reload();
            }
        }

    var value = '';
    var target = document.getElementById("identifiant");
    inputService = tbCvdIdService();
    inputService.init({element: target});
    //active le ctrl+A -- le copy/paste est gÃ©rÃ© par la toolbox
    target.addEventListener("keydown", function(e){
        if((e.key === 'A' || e.key === 'a') && e.ctrlKey){
            e.target.select()
        }
    });


    var c = Cookie.lire("CVS_DONNEE_MEMO");
    //s'il y a un cookie
    if (c && c.length > 9 && !isNaN(c)) {

        //on coche la case par dÃ©faut
        var memoriserCheck = document.getElementById("check");
        memoriserCheck.setAttribute('checked', true);
        //on enlÃ¨ve l'attribut "name" de l'input "identifiant"
        target.removeAttribute('name');
        //on l'initialise avec les 2 derniers chiffres du cookie, la toolbox rend le champ non modifiable s'il y a au moins une *
        value = "********" + c.substring(8, 10);
        inputService.set(target, value);

        //on crÃ©e un input cachÃ© avec un attribut name=username qu'on initialise avec le cookie complet
        var ajoutInput = document.getElementById("hidden");
        var input = document.createElement('input');
        input.setAttribute('name', "username");
        input.setAttribute('type', 'hidden');
        input.setAttribute("id", "id_cookie");
        input.setAttribute('value', c);
        ajoutInput.appendChild(input);

        //on regarde si l'utilisateur clique sur la croix de reset quand il y a un cookie
        var reset = document.querySelector("[data-lien-user]");
        reset.addEventListener("click", IdReset);

    } else {
        //s'il n'y a pas de cookie
        inputService.set(target, value);
    }

    // Gestion READONLY
    if (value.indexOf('*') >= 0) {
        inputService.setReadOnly(target);
    }


    var passwd = document.getElementById("password");
    pswService = tbCvdPswService();
    pswService.init({element: passwd});
    document.addEventListener("tbCvdPsw", eventPsw);

    setTimeout(function () {
        // tbLoader2Service.hide();
    }, 500);

    setTimeout(function () {
        JQ.$("#identifiant").focus();
    }, 800);

});


