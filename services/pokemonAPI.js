const fetch = require("node-fetch");
require("dotenv").config();

async function fetchCardFromAPI(id){
    const res = await fetch(`GET https://api.pokemontcg.io/v2/cards/${id}`,{
        headers: {
            "X-Api-key": process.env.POKEMON_API_KEY
        }
    });

    const json = await res.json();
    return json.data;
}

module.exports = fetchCardFromAPI;