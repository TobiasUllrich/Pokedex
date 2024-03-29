/* Generates the PokeCard for the Current Pokemon */
function generatePokecard(id, picture, name, bgcol) {
    document.getElementById('pokedex').innerHTML += `
    <div id="pokemon${id}" class="pokecarddesign pokecarddesignForHover">
    <div><h1 id="name${id}"></h1></div>
    <div class="pokecardsection">
        <img id="image${id}">
        <div class="shortfacts">
            <div id="number${id}" class="idsfont pad-bot"></div>
            <div id="types${id}" class="types pad-bot2"></div>
            <div id="height${id}" class="pad-bot"></div>
            <div id="weight${id}" class="pad-bot"></div>
            <div id="base-experience${id}" class="curs"></div>
        </div>
    </div>

    <div class="morefacts">
        <div class="morefactsstyle">
        <button class="btn-design btn1" id="location-area-encounters${id}" onclick="showLocations(${id},'Location','${picture}','${name}','${bgcol}','${type}','${bgcollist}')">Locations</button>
        <button class="btn-design btn2" id="species${id}" onclick="showSpecies(${id},'Species','${picture}','${name}','${bgcol}','${type}','${bgcollist}')">Species</button>
        </div>
        <div class="morefactsstyle">
        <button class="btn-design btn3" id="abilities${id}" onclick="showAbilities(${id},'Abilities','${picture}','${name}','${bgcol}','${type}','${bgcollist}')">Abilities</button>
        <button class="btn-design btn4" id="moves${id}" onclick="showMoves(${id},'Moves','${picture}','${name}','${bgcol}','${type}','${bgcollist}')">Moves</button>
        </div>
       </div>
 </div>`;
}
/* Generates the PokeCard for the Current Pokemon */

