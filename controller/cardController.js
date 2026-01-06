const pokemonAPI = require("../services/pokemonAPI");
const db = require("../db/queries");

// fetches from API a list of pokemon based on name searched e.g. Charizard
async function getCardList(req, res){
    const cardName = req.query.name;
    if(!cardName){
        return res.render("cardList", {cardList: [], error: null});
    }
    try {
        const pageSize = 10;
        const page = 1;
        const cardList = await pokemonAPI.fetchCardsByName(cardName, pageSize, page);
        res.render("cardList", {cardList, error: null});
        console.log("card list is:",cardList);        
    } catch (error) {
        console.error("Controller caught: ", error.message);
        res.render("cardList",{
            cardList: [],
            error: "Something went wrong"
        });
    }
}

//fetches from API all cards from searched expansion e.g. Pokemon Scarlet & Violet - Black Bolt
async function getSetData(req, res){
    try {
        // const setId = req.params.id;
        const setData = await pokemonAPI.fetchSetFromAPI();
        res.render("set",{setData});        
    } catch (error) {
        console.log(error);
    }
}

// shows the cards user saved in database
async function showCollection(req, res){
    const cards = await db.getAllCards();
    console.log(cards);
    const cardInfo = cards.map(card=>({
        name: card.name,
        price: card.price,
        picture: card.picture,
        expansion: card.expansionId
    }));
    res.render("collection",cardInfo);
}

// saves a card in database
async function saveCardToCollection(req, res){
    const {cardId, cardName, cardPicture, cardPrice, expansionId} = req.body;
    const saveCard = await db.saveCardToDatabase(cardId, cardName, cardPicture, cardPrice, expansionId);
    // res.send(saveCard);
    console.log("Card saved to db: ", saveCard);    
    res.redirect("/collection");
}

//update card info - probably the price based on market value
async function updateCollection(req,res){}

//deletes a card from database
async function deleteCard(req,res){
    const cardId = req.params.id;
    const cardDelete = await db.deleteCard(cardId);
    res.send(cardDelete);
}

async function cardDetails(req,res){
    try{
        const {id} = req.params;
        const card = await pokemonAPI.fetchCardFromAPI(id);
        res.render("cardDetails", {card});
    }catch(err){
        console.error(err.message);
        throw err;
    }
}


module.exports = {
    getCardList,
    getSetData,
    showCollection,
    saveCardToCollection,
    updateCollection,
    deleteCard,
    cardDetails
}