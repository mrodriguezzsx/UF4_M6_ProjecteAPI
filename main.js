let pokedex = document.querySelector(".pokedex")

let arrayPokemon = [];

function crearCarta(pokemon) {
    //Carta Pokemon
    const carta = document.createElement("div");
    carta.classList.add('cartaPokemon');

    //Apartado del sprite
    const containerSprite = document.createElement('div');
    containerSprite.classList.add('container-img');

    const spriteImage = document.createElement('img');
    spriteImage.classList.add('sprite');
    spriteImage.src = pokemon.sprites.other["official-artwork"].front_default;

    containerSprite.appendChild(spriteImage);

    //Numero de Pokedex
    const numeroPokedex = document.createElement('p');
    numeroPokedex.classList.add('numeroPokedex');
    numeroPokedex.innerText = formatID(parseInt(pokemon.id)) + pokemon.id;

    //Apartado del Nombre
    const nombrePokemon = document.createElement('p');
    nombrePokemon.classList.add('nombrePokemon');
    nombrePokemon.innerText = pokemon.name;

    const containerInfo = document.createElement('div');
    containerInfo.classList.add('container-info')
    containerInfo.appendChild(nombrePokemon)
    containerInfo.appendChild(numeroPokedex)

    //Apartado de Tipos
    const containerTipos = document.createElement('div');
    containerTipos.classList.add('container-tipos');

    const listaTipos = document.createElement('ul');
    listaTipos.classList.add('listaTipos');

    for (let n = 0; n < pokemon.types.length; n++) {
        const tipoElemento = document.createElement("li");
        const tipos = document.createTextNode(pokemon.types[n].type.name)
        tipoElemento.appendChild(tipos);
        listaTipos.appendChild(tipoElemento);
    }

    containerTipos.appendChild(listaTipos)

    //Creacions
    carta.appendChild(containerInfo)
    carta.appendChild(containerSprite)
    carta.appendChild(containerTipos)
    
    pokedex.appendChild(carta);

}

async function buscarPokemon(id) {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + id );
    return await response.json();
}
let promises = [];
for (let n = 1; n <= 151; n++) {
    promises.push(buscarPokemon(n))
}
Promise.all(promises).then(function(pokemons) {
    pokemons.forEach( e => crearCarta(e));
});


function formatID(number) {
    if (number < 10) {
        return "#00";
    } else if (number < 100) {
        return "#0";
    } return "#";
}

