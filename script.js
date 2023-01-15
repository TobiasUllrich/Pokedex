/* [1.] Funktion um weitere HTML-Dateien einzubinden (Code von w3c)*/
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]'); //Alle Elemente mit Attribut '[w3-include-html]' werden ausgewählt
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // die Suche nach dem Attribut beinhaltet auch header.html, wenn die Seite dieses Attribut besitzt
        let resp = await fetch(file); // await kann nur mit asynchroner Funktion verwendet werden
        if (resp.ok) {   // ok = Boolean Variable die den Status anzeigt ob alles ok ist (true) oder eben nicht (false)
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}
/* [1.] Funktion um weitere HTML-Dateien einzubinden (Code von w3c)*/


/* [2.] Global Variables: Current loaded Pokemon & Number of Pokemons that will be loaded */
let currentpokemon;          // JSON-Array of Current Pokemon
let usage;                   // JSON-Array for Details of Pokemon
let bgcol;                   // Background-Color of Pokemon
let bgcolbtn;                // Background-Color of Button
let loadingPokemons = false; // Variable to give Information if Pokemons are being loaded right know
let id = 1;                  // id of Pokemon
let endnumberofpokemons = 51; // 899 is MAX       
/* [2.] Global Variables: Current loaded Pokemon & Number of Pokemons that will be loaded */


/* [3.] Function to load Pokemons */
async function loadPokemon(endnumberofpokemons) {
    
    loadingPokemons=true; //Loading Process startet

    for (start = id; id < endnumberofpokemons; id++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        
        let response = await fetch(url).catch(errorFunction); //await lässt auf den Server warten bis der fetch vollzogen werden kann, weil Server evtl. etwas braucht; await kann nur mit asynchroner Funktion verwendet werden
        currentpokemon = await response.json(); // await lässt uns warten bis die Variable in einen JSON umgeandelt ist (für uns primär wichtig)

        renderPokemonInfo(currentpokemon, id);
        
    }
    filterPokemons(); // Nachdem der Lade-Prozess beeendet wurde muss der Filter nochmal angewendet werden
    loadingPokemons=false; //Loading Process finished
}
/* [3.] Function to load Pokemons */


/* [4.] Error-Function */
function errorFunction() {
    console.log('Fehler aufgetreten');
}
/* [4.] Error-Function */


/* [5.] Render the currenpokemon */
function renderPokemonInfo(currentpokemon, id) {
    let picture = currentpokemon['sprites']['other']['official-artwork']['front_shiny']; // Picture of Pokemon
    console.log(currentpokemon['sprites']);
    console.log(currentpokemon['sprites']['other']);
    console.log(currentpokemon['sprites']['other']['official-artwork']['front_shiny']);
    let name = capitalizeFirstLetter(currentpokemon['name']); // Name of Pokemon

    setbgcolorforCurrentPokemon();

    generatePokecard(id, picture, name, bgcol);

    fillPokecard(id, picture, name);

    id++;
}
/* [5.] Render the currenpokemon */


/* [7.] Fills the PokeCard for the Current Pokemon with values */
function fillPokecard(id, picture, name) {
    document.getElementById(`name${id}`).innerHTML = name;
    document.getElementById(`image${id}`).src = picture;
    document.getElementById(`number${id}`).innerHTML = '<b>ID:</b> ' + currentpokemon['id'];
    document.getElementById(`types${id}`).innerHTML = '<b>Type:</b> ' + capitalizeFirstLetter(currentpokemon['types'][0]['type']['name']);
    document.getElementById(`height${id}`).innerHTML = '<b>Height:</b> ' + currentpokemon['height'] / 10 + ' m';
    document.getElementById(`weight${id}`).innerHTML = '<b>Weight:</b> ' + currentpokemon['weight'] / 10 + ' kg';
    document.getElementById(`base-experience${id}`).innerHTML = '<b>Experience:</b> ' + currentpokemon['base_experience'];
    document.getElementById(`pokemon${id}`).style = `background-color: ${bgcol};`;
    document.getElementById(`location-area-encounters${id}`).style = `background-color: ${bgcolbtn};`;
    document.getElementById(`species${id}`).style = `background-color: ${bgcolbtn};`;
    document.getElementById(`abilities${id}`).style = `background-color: ${bgcolbtn};`;
    document.getElementById(`moves${id}`).style = `background-color: ${bgcolbtn};`;
}
/* [7.] Fills the PokeCard for the Current Pokemon with values */


/* [8.] Saves the background-color for the PokeCard of the Current Pokemon */
function setbgcolorforCurrentPokemon() {
    if (capitalizeFirstLetter(currentpokemon['types'][0]['type']['name']) == 'Grass') { bgcol = '#78c850'; bgcolbtn ='green'; };

    if (capitalizeFirstLetter(currentpokemon['types'][0]['type']['name']) == 'Fire') { bgcol = '#f08030'; bgcolbtn ='orange'; };

    if (capitalizeFirstLetter(currentpokemon['types'][0]['type']['name']) == 'Water') { bgcol = '#6890f0'; bgcolbtn ='blue'; };

    if (capitalizeFirstLetter(currentpokemon['types'][0]['type']['name']) == 'Bug') { bgcol = '#a8b820'; bgcolbtn ='green'; };

    if (capitalizeFirstLetter(currentpokemon['types'][0]['type']['name']) == 'Normal') { bgcol = '#a8a878'; bgcolbtn ='brown'; };

    if (capitalizeFirstLetter(currentpokemon['types'][0]['type']['name']) == 'Poison') { bgcol = '#a040a0'; bgcolbtn ='darkviolet'; };

    if (capitalizeFirstLetter(currentpokemon['types'][0]['type']['name']) == 'Electric') { bgcol = '#f8d030'; bgcolbtn ='orange'; };

    if (capitalizeFirstLetter(currentpokemon['types'][0]['type']['name']) == 'Ground') { bgcol = '#e0c068'; bgcolbtn ='orange'; };

    if (capitalizeFirstLetter(currentpokemon['types'][0]['type']['name']) == 'Fairy') { bgcol = '#ee99ac'; bgcolbtn ='red'; };

    if (capitalizeFirstLetter(currentpokemon['types'][0]['type']['name']) == 'Fighting') { bgcol = '#c02038'; bgcolbtn = 'red'; };

    if (capitalizeFirstLetter(currentpokemon['types'][0]['type']['name']) == 'Psychic') { bgcol = '#f85888'; bgcolbtn = 'red'; };

    if (capitalizeFirstLetter(currentpokemon['types'][0]['type']['name']) == 'Rock') { bgcol = '#b8a038'; bgcolbtn = 'brown'; };

    if (capitalizeFirstLetter(currentpokemon['types'][0]['type']['name']) == 'Ghost') { bgcol = '#705898'; bgcolbtn = 'darkviolet'; };

    if (capitalizeFirstLetter(currentpokemon['types'][0]['type']['name']) == 'Ice') { bgcol = '#98d8d8'; bgcolbtn = 'blue'; };

    if (capitalizeFirstLetter(currentpokemon['types'][0]['type']['name']) == 'Dragon') { bgcol = '#7038f8'; bgcolbtn = 'darkviolet'; };

    if (capitalizeFirstLetter(currentpokemon['types'][0]['type']['name']) == 'Dark') { bgcol = '#705848'; bgcolbtn = 'brown'; };

    if (capitalizeFirstLetter(currentpokemon['types'][0]['type']['name']) == 'Steel') { bgcol = '#b8b8d0'; bgcolbtn = 'burlywood'; };

    if (capitalizeFirstLetter(currentpokemon['types'][0]['type']['name']) == 'Flying') { bgcol = '#a890f0'; bgcolbtn = 'darkviolet'; };
}
/* [8.] Saves the background-color for the PokeCard of the Current Pokemon */


/* [9.] If you press the Locations-Button */
function showLocations(id, Info, picture, name, bgcol) {
    let path = `https://pokeapi.co/api/v2/pokemon/${id}/encounters`;
    loadAdditionalInfos(path, Info);

    let text = `Find ${name} in these locations:`;
    fillDetailsCard(name, picture, bgcol, text);
}
/* [9.] If you press the Locations-Button */


/* [10.] If you press the Species-Button */
function showSpecies(id, Info, picture, name, bgcol) {
    let path = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;
    loadAdditionalInfos(path, Info);

    let text = `More infos on ${name}:`;
    fillDetailsCard(name, picture, bgcol, text);
}
/* [10.] If you press the Species-Button */


/* [11.] If you press the Abilities-Button */
function showAbilities(id, Info, picture, name, bgcol) {
    let path = `https://pokeapi.co/api/v2/pokemon/${id}`; //Ursprüngliche Suche
    loadAdditionalInfos(path, Info);

    let text = `Abilities of ${name}:`;
    fillDetailsCard(name, picture, bgcol, text);
}
/* [11.] If you press the Abilities-Button */


/* [12.] If you press the Moves-Button */
function showMoves(id, Info, picture, name, bgcol) {
    let path = `https://pokeapi.co/api/v2/pokemon/${id}`; //Ursprüngliche Suche
    loadAdditionalInfos(path, Info);

    let text = `Moves of ${name}:`;
    fillDetailsCard(name, picture, bgcol, text);
}
/* [12.] If you press the Moves-Button */


/* [13.] If you press any of the Buttons */
function fillDetailsCard(name, picture, bgcol, text) {
    document.getElementById(`addInfosPokemon`).innerHTML = name;
    document.getElementById(`addInfosImg`).src = picture;
    document.getElementById(`addSubheader`).innerHTML = text;
    document.getElementById('info-box').style = `background-color: ${bgcol};`
    document.getElementById('info-bg').classList.remove('d-none');
}
/* [13.] If you press any of the Buttons */


/* [14.] If Detail-Card of a Pokemon is shown, then more data is needed */
async function loadAdditionalInfos(url, Info) {

    let response = await fetch(url);
    let usage = await response.json();
    
    hideElement('addNodata');
    showElement('ListforInfos');
    emptyList();

    // Depending on which button was pressed different Data will be extracted
    if (Info == 'Location') { fillLocations(usage); };
    if (Info == 'Species') { fillSpecies(usage); };
    if (Info == 'Abilities') { fillAbilities(usage); };
    if (Info == 'Moves') { fillMoves(usage); };

}
/* [14.] If Detail-Card of a Pokemon is shown, then more data is needed */


/* [15.] Locations will be listed */
function fillLocations(usage){   
      let len = usage.length;
      let list = document.getElementById('ListforInfos');
      list.innerHTML=``;

      if (len != 0){
      for (i=0;i<len;i++)
      {
        let liel = document.createElement("li");
        liel.appendChild(document.createTextNode(capitalizeFirstLetter(usage[i]['location_area']['name'])));
        list.appendChild(liel);
      }  
      }
      else
      {
        hideElement('ListforInfos');
        showElement('addNodata');
      };
}
/* [15.] Locations will be listed */


/* [16.] Species will be listed */
function fillSpecies(usage){
        let len = usage['flavor_text_entries'].length;
        //console.log('Locations Länge: ',usage.length);
        let list = document.getElementById('ListforInfos')
        list.innerHTML=``;
  
        if (len != 0){
        for (i=0;i<len;i++)
        {  
          if (usage['flavor_text_entries'][i]['language']['name']=='en') 
          {
           let liel = document.createElement("li");
           liel.appendChild(document.createTextNode(usage['flavor_text_entries'][i]['flavor_text']));
           list.appendChild(liel);
           };
          //console.log('Location: ',usage[i]['location_area']['name']);
         // HTML-CODE to Come
        };  
        }
        else
        {
          hideElement('ListforInfos');
          showElement('addNodata');
        };
}
/* [16.] Species will be listed */


/* [17.] Abilities will be listed */
function fillAbilities(usage){
        let len = usage['abilities'].length;
        //console.log('Locations Länge: ',usage.length);
        let list = document.getElementById('ListforInfos');
        list.innerHTML=``;
  
        if (len != 0){
        for (i=0;i<len;i++)
        {
          let liel = document.createElement("li");
          liel.appendChild(document.createTextNode(capitalizeFirstLetter(usage['abilities'][i]['ability']['name'])));
          list.appendChild(liel);
        }  
        }
        else
        {
          hideElement('ListforInfos');
          showElement('addNodata');
        };
}
/* [17.] Abilities will be listed */


/* [18.] Moves will be listed */
function fillMoves(usage){
        let len = usage['moves'].length;
        let list = document.getElementById('ListforInfos');
        list.innerHTML=``;
  
        if (len != 0){
        for (i=0;i<len;i++)
        {
          let liel = document.createElement("li");
          liel.appendChild(document.createTextNode(capitalizeFirstLetter(usage['moves'][i]['move']['name'])));
          list.appendChild(liel);
        }  
        }
        else
        {
          hideElement('ListforInfos');
          showElement('addNodata');
        };
}
/* [18.] Moves will be listed */


/* [19.] Empty Details */
function emptyList(){
  document.getElementById('ListforInfos').innerHTML = ``; 
}
/* [19.] Empty Details */


/* [20.] Hide Fixed Element */
function hideElement(idofelement) {
    document.getElementById(`${idofelement}`).classList.add('d-none');
}
/* [20.] Hide Fixed Element */


/* [21.] Show Fixed Element */
function showElement(idofelement) {
    document.getElementById(`${idofelement}`).classList.remove('d-none');
}
/* [21.] Show Fixed Element */


/* [22.] Filter Pokemons */
function filterPokemons() {

    let searchinput = document.getElementById('inputfield').value;
    let len = document.getElementById('inputfield').value.length;
    //console.log(len);

    for (i = 1 ; i < endnumberofpokemons ; i++) {
       // Problem beim Filter ist, dass er sich teilweise auf HTML-Elemente anwendet die noch gar nicht existieren!!!
       // DESWEGEN: 2 Fälle! 
       // Falls er das HTML-ELEMENT findet wird es unsichtbar gemacht falls es nicht den Filter-Kriterien entspricht
        if(document.getElementById(`name${i}`) !=null){
        //console.log(i + 'Nicht Null');

            if (len > 0) {
                if (document.getElementById(`name${i}`).innerHTML.slice(0, len) != searchinput) { hideElement(`pokemon${i}`); }
                else { showElement(`pokemon${i}`); }
            }
            else { showElement(`pokemon${i}`); };
        }

        else
        // Falls er das HTML-ELEMENT nicht findet macht er gar nichts, somit wird ein Fehler vermieden
        {
        //console.log(i + 'Null');
        }
            
    }
}
/* [22.] Filter Pokemons */


/* [23.] Close the Fixed Element */
window.onclick = function (event) {
    if (event.target.id == 'info-bg') {
        hideElement('info-bg');
    }
}
/* [23.] Close the Fixed Element */


/* [24.] Gibt den übergebenen String zurück aber macht den ersten Buchstaben groß */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
/* [24.] Gibt den übergebenen String zurück aber macht den ersten Buchstaben groß */


/* [25.] jQuery zum Nachladen von Daten, wenn man übers Scrollen ganz unten beim Dokument angekommen ist */
       // 1. Window wird selektiert
       // 2. Das Scroll-Event wird angesprochen
       // 3. Funktion wird ausgeführt unter gewissen Bedingungen 
       // 4. $(window).scrollTop() -> zeigt Abstand nach oben an (startet bei 0, wenn Scrollleiste ganz oben und wird dann immer größer)
       // 5. $(window).height() -> zeigt Höhe des sichtbaren Bereichs an
       // 6. $(document).height() -> zeigt Höhe des Dokuments an
       // ZIEL: Wenn der sichtbare Bereich und die Entfernung nach ganz oben zusammen die Höhe des Dokuments erreichen, dann soll nachgeladen werden
       // PROBLEM: Summe aus (sichtbarer-Bereich + Entfernung-nach-oben) erreicht niemals ganz die Höhe-des-Dokuments 
       // LÖSUNG: Abs() nutzen weil Abweichung immer zwischen 0 und 1!
$(window).on('scroll', function() {

    //console.log('Entfernung von Oben',$(window).scrollTop());
    //console.log('Höhe des sichtbaren Bereichs',$(window).height());
    //console.log('Höhe des Dokuments',$(document).height());
    //console.log('Sichtbarer-Bereich + Entfernung-nach-oben',$(window).height()+$(window).scrollTop());
    //console.log('Höhe des Dokuments',$(document).height());

    if(Math.abs($(window).scrollTop() + $(window).height() - $(document).height())<1) {

        endnumberofpokemons += 10; // Go for the next 10 Pokemons!
        //console.log("Am Ende des Dokuments angekommen!", loadingPokemons);
        
        //Only if there is no Loading Process right now a new loading Process can be startet!!!
        if(!loadingPokemons){
            loadPokemon(endnumberofpokemons);};
    }
 ;});

// FÜRS MOBILE: ES GIBT KEIN SCROLL-EVENT AUF DEM HANDY, SONDERN NUR TOUCH-EVENTS
// -> AM ANFANG DES TOUCH-EVENTS = "BERÜHRUNG DES HANDY-BILDSCHIRMS" WIRD GEPRÜFT WIE WEIT UNTEN MAN IST: < 200px verbleibend? -> Pokemon werden neu geladen
 $(window).on('touchstart', ontouchstart);

 function ontouchstart(){ 
    if(Math.abs($(window).scrollTop() + $(window).height() - $(document).height())<200) {

        endnumberofpokemons += 10; // Go for the next 10 Pokemons!
        //console.log("Am Ende des Dokuments angekommen!", loadingPokemons);
        
        //Only if there is no Loading Process right now a new loading Process can be startet!!!
        if(!loadingPokemons){
            
            loadPokemon(endnumberofpokemons);};
        //console.log('TOUCHSTART');
 }};


// FÜRS MOBILE: ES GIBT KEIN SCROLL-EVENT AUF DEM HANDY, SONDERN NUR TOUCH-EVENTS
// -> AM ENDE DES TOUCH-EVENTS = "BERÜHRUNG DES HANDY-BILDSCHIRMS" WIRD GEPRÜFT WIE WEIT UNTEN MAN IST: < 200px verbleibend? -> Pokemon werden neu geladen
 $(window).on('touchend', ontouchend); // for Mobile

 function ontouchend(){ 

    if(Math.abs($(window).scrollTop() + $(window).height() - $(document).height())<200) {

        endnumberofpokemons += 25; // Go for the next 10 Pokemons!
        //console.log("Am Ende des Dokuments angekommen!", loadingPokemons);
        
        //Only if there is no Loading Process right now a new loading Process can be startet!!!
        if(!loadingPokemons){
            
            loadPokemon(endnumberofpokemons);};

    //console.log('TOUCHEND');
 };};
/* [25.] jQuery zum Nachladen von Daten, wenn man übers Scrollen ganz unten beim Dokument angekommen ist */