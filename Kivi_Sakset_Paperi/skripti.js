//Muuttuja julistetaan
let  = 0;
let tietokoneenPisteet = 0;

//liitetään html elementit muuttujiin
    //painikkeet

let startBtn = document.getElementById("newBtn")

let kiviValinta = document.getElementById("kiviBtn");

let paperiValinta = document.getElementById("paperiBtn");

let saksetValinta = document.getElementById("saksetBtn");

    //Tekstit ja kuvat
let isoTxt = document.getElementById("isoTxt");
let valinnatTxt = document.getElementById("valinnatTxt");
let valintaKuva = document.getElementById("valintaKuva");
let voittajaTxt = document.getElementById("voittajaTxt");
let pisteetTxt = document.getElementById("pisteetTxt");
let pelaajanPisteet = document.getElementById("pelaajanPisteet");

let peliAlue = document.getElementById("pelialue");



//peli alustetaan
    //Kun sivu on latautunut

window.onload = function(){
    initializeGame();
}

//Aloitus functio

function initializeGame(){
    isoTxt.innerHTML = "Kivi, Sakset ja Paperi Peli";
    valinnatTxt.innerHTML = "Aloita valitsemalla aseesi!";
    pelaajanPisteet = 0;
    tietokoneenPisteet = 0;
    pisteetTxt.innerHTML = "";
    peliAlue.style.display = "initial";
    startBtn.style.display = "none";
}

//Pelin toiminnallisuus

startBtn.addEventListener("click", function (){
    initializeGame();
});

kiviValinta.addEventListener("click", function (){
    pelaajanValinta("KIVI");
});

paperiValinta.addEventListener("click", function (){
    pelaajanValinta("PAPERI");
});

saksetValinta.addEventListener("click", function (){
    pelaajanValinta("SAKSET");
});


function pelaajanValinta(pelaajaChoice){

    let tietokoneChoice = tietokoneenValinta();
    valinnatTxt.innerHTML = "Pelaaja valitsi " + pelaajaChoice + ". Tietokone valitsi " + tietokoneChoice;
    valintojenVertaus(pelaajaChoice, tietokoneChoice);
}

function tietokoneenValinta(){
    let rollNumero = Math.floor(Math.random()*3);
    if(rollNumero === 0) {
        valintaKuva.src = "kuvat/kivi.png";
        return "KIVI";
    }
    else if(rollNumero === 1){
        valintaKuva.src = "kuvat/paperi.png";
        return "PAPERI";
    }
    else {
        valintaKuva.src = "kuvat/sakset.png";
        return "SAKSET";
    }
    console.log(rollNumero);
}

function valintojenVertaus(pvalinta, tvalinta){
    if (pvalinta === tvalinta){
        voittajaTxt.innerHTML = "Tasapeli tuli!";
    }
    else if (pvalinta === "KIVI"){
        if(tvalinta === "SAKSET"){
            voittajaTxt.innerHTML = "Kivi rikkoo sakset! <br> Pelaajalle piste!";
             pisteUpkeep(1,0);
        }
        else {
            voittajaTxt.innerHTML = "Paperi voittaa kiven! <br> Tietokoneelle piste!";
            pisteUpkeep(0,1);
        }
    }
    else if (pvalinta === "PAPERI"){
        if(tvalinta === "KIVI")
        {
            voittajaTxt.innerHTML = "Paperi voittaa kiven! <br> Pelaajalle piste!";
             pisteUpkeep(1,0);
        }
        else {
            voittajaTxt.innerHTML = "Sakset voittaa paperin! <br> Tietokoneelle piste!";
            pisteUpkeep(0,1);
        }
    }
    else if (pvalinta === "SAKSET"){
        if(tvalinta === "PAPERI"){
            pisteUpkeep(1,0);
            voittajaTxt.innerHTML = "Sakset voittaa paperin! <br> Pelaajalle piste!";    
        }
        else {
            voittajaTxt.innerHTML = "Kivi voittaa sakset! <br> Tietokoneelle piste";
            pisteUpkeep(0,1);
        }
    }
}

function pisteUpkeep(ppisteet, tpisteet){
    pelaajanPisteet += ppisteet;
    tietokoneenPisteet += tpisteet;
    pisteetTxt.innerHTML = pelaajanPisteet + " pisteitä pelaajalla <br>" + tietokoneenPisteet + " pisteitä tietokoneella"; 
    if (pelaajanPisteet > 2 || tietokoneenPisteet > 2){
        if(pelaajanPisteet > tietokoneenPisteet){

            winScreen("Pelaaja voittaa pelin!");
        }
        else {

            winScreen("Tietokone voittaa pelin!");
        }
    }
}

function winScreen(voittoTeksti){
    isoTxt.innerHTML = voittoTeksti;
    peliAlue.style.display = "none";
    valinnatTxt.innerHTML = "lopulliset pisteet: <br> Pelaajan pisteet " + pelaajanPisteet + " <br> Tietokoneen pisteet " + tietokoneenPisteet;
    startBtn.style.display = "initial";
}