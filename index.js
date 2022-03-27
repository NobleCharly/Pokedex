// DOM
const pokeId = document.getElementById("pokeId");
const pokeImg = document.getElementById("pokeImg");
const pokeName = document.getElementById("pokeName");
const pokeInput = document.getElementById("pokeInput");
const poketype = document.getElementById("pokeType");
const statsList = document.getElementById("pokeStats");
const pokeMoves = document.getElementById("pokeMoves");
const pokeImgBackside = document.getElementById("pokeImgBackside");


var pokemon = "";

const  buscarPokemon = () =>{
    pokemon = pokeInput.value;
    pokemon = pokemon.toLowerCase();
    fetchPokemon(pokemon);
}

//Para buscar presionando enter
pokeInput.addEventListener("keydown", function (e) {
    if (e.code === "Enter") { 
        buscarPokemon(pokemon);
    }
});

const fetchPokemon = (pokemon) => {
    const url =`https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    fetch(url).then((res)=>{
        console.log(res);
        return res.json();
    }).then((data) => {
        console.log(data)
        updatePoke(data)
        return data;
    })
}


updatePoke = (data) =>{
    pokeImg.src = data.sprites.other.home.front_default;
    //pokeImg.src = data.sprites.front_default;
    pokeId.innerHTML = '#' + data.id;
    pokeName.innerHTML = data.name;
    pokeImgBackside.src = data.sprites.other.home.front_shiny;    
    poketype.innerHTML = data.types[0].type.name;
    cleanInfo();
    setStats(data.stats);
    setMoves(data.moves);

}

const setStats = (stats) => {
    console.log('STATS',stats)
    for(let i = 0; i< stats.length; i++){
        const li = document.createElement('li');
        li.innerHTML = stats[i].stat.name + ': ' + stats[i].base_stat;
        statsList.appendChild(li);
    }

}

const setMoves = (moves) =>{
    console.log('MovesTATS',moves)
    for(let i = 0; i< moves.length; i++){
        const li = document.createElement('li');
        li.innerHTML = moves[i].move.name;
        pokeMoves.appendChild(li);
    }
}

const cleanInfo = ()=> {
    pokeMoves.innerHTML="";
    statsList.innerHTML="";
}
