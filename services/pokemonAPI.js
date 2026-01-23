require("dotenv").config();
const fetch = require("node-fetch").default;

async function fetchCardFromAPI(id){
    try{
        const response = await fetch(`https://api.tcgdex.net/v2/en/cards/${id}`);
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        return json;
    }catch(error){
        console.log("fetchCardFromAPI failed:",error.message);
        throw error;       
    }
}

async function fetchSetFromAPI(){
    try {
        const seriesResponse = await fetch(`https://api.tcgdex.net/v2/en/series`);
        if(!seriesResponse.ok){
            throw new Error(`HTTP error, status: ${seriesResponse.status}`);
        }

        const allSeries = await seriesResponse.json();

        const allSets = [];

        for (const series of allSeries){
            try {
                const seriesDetailResponse =  await fetch(`https://api.tcgdex.net/v2/en/series/${series.id}`);
                if(seriesDetailResponse.ok){
                    const seriesDetail = await seriesDetailResponse.json();
                    if(seriesDetail.sets){
                        seriesDetail.sets.forEach(set=>{
                            allSets.push({
                                ...set,
                                series: series.name,
                                seriesId: series.id
                            });
                        });
                    }
                }
            } catch (err) {
                console.error(err);
            }
        }
        return allSets;
    } catch (err) {
        console.error(err);
    }
}

async function fetchCardsFromSet(id){
    try {
        const response = await fetch(`https://api.tcgdex.net/v2/en/sets/${id}`);
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error.message);        
    }
}

async function fetchCardsByName(name, pageSize, page){
    if(!name || !name.trim())return [];
    try{
        const response = await fetch(`https://api.tcgdex.net/v2/en/cards?name=${name}&pagination:page=${page}&pagination:itemsPerPage=${pageSize}`);
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();    
        return json;
    }catch(err){
        console.error("Pokemon API failed:", err.message);
        throw err; 
    }
}


module.exports = {
    fetchCardFromAPI,
    fetchSetFromAPI,
    fetchCardsFromSet,
    fetchCardsByName,
};