const {fetchCardFromAPI} = require("../services/pokemonAPI");
const {getAllCards} = require("../db/queries");

// async function importCard(req,res){
//     try{
//         const cardId = req.param.id;
//         const apiCard = await fetchCardFromAPI(cardId);
        
//     }catch(err){
//         console.log(err);   
//     }
// }

// async function getAllCards(req,res){}

// module.exports = {
//     importCard,
//     getAllCards
// }