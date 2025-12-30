const pokemonAPI = require("../services/pokemonAPI");
const db = require("../db/queries");

// fetches from API a list of pokemon based on name searched e.g. Charizard
async function getCardList(req, res){
    try {
        const cardName = req.query.name;
        const pageSize = 250;
        const page = 1;
        const cardList = await pokemonAPI.fetchCardsByName(cardName, pageSize, page);
        res.render("cardList",cardList);
    } catch (error) {
        console.log(error);
    }
}

//fetches from API all cards from searched expansion e.g. Pokemon Scarlet & Violet - Black Bolt
async function getExpansion(req, res){
    try {
        const expansionId = req.param.id;
        const expansionData = await pokemonAPI.fetchSetFromAPI(expansionId);
        res.render("expansion",expansionData);        
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
    const cardId = req.param.id;
    const cardDelete = await db.deleteCard(cardId);
    res.send(cardDelete);
}

module.exports = {
    getCardList,
    getExpansion,
    showCollection,
    saveCardToCollection,
    updateCollection,
    deleteCard
}