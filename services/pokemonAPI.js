const fetch = require("node-fetch").default;
require("dotenv").config();

async function fetchCardFromAPI(id){
    const res = await fetch(`https://api.pokemontcg.io/v2/cards/${id}`,{
        headers: {
            "X-Api-key": process.env.POKEMON_API_KEY
        }
    });

    const json = await res.json();
    return json.data;
}

async function fetchSetFromAPI(id){
    const res = await fetch (`https://api.pokemontcg.io/v2/sets/${id}`,{
        headers: {
            "X-Api-key": process.env.POKEMON_API_KEY
        }
    });

    const json = await res.json();
    return json.data;
}

async function fetchCardsByName(name, pageSize, page){
    const res = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${name}&orderBy=set.releaseDate&pageSize=${pageSize}&page=${page}`,{
        headers:{
            "X-Api-key": process.env.POKEMON_API_KEY
        }
    });
    
    const json = await res.json();
    return json.data;
}



module.exports = {
    fetchCardFromAPI,
    fetchSetFromAPI,
    fetchCardsByName
};