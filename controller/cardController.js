const pokemonAPI = require("../services/pokemonAPI");
const db = require("../db/queries");

// fetches from API a list of pokemon based on name searched e.g. Charizard
async function getSearchedCard(req, res){
    const cardName = req.query.name;
    if(!cardName){
        return res.render("card/card", {cardList: [], error: null});
    }
    try {
        const pageSize = 10;
        const page = 1;
        const cardList = await pokemonAPI.fetchCardsByName(cardName, pageSize, page);
        res.render("card/card", {cardList, error: null});
        console.log("card list is:",cardList);        
    } catch (error) {
        console.error("Controller caught: ", error.message);
        res.render("card/card",{
            cardList: [],
            error: "Something went wrong"
        });
    }
}

//fetches data of a specific card
async function cardDetails(req,res){
    try{
        const {id} = req.params;
        const card = await pokemonAPI.fetchCardFromAPI(id);
        res.render("card/cardDetails", {card});
    }catch(err){
        console.error(err.message);
        throw err;
    }
}

//fetches from API all sets e.g Black Bolt, Paradox Rift, 151
async function getListOfSets(req, res){
    try {
        const setData = await pokemonAPI.fetchSetFromAPI();
        res.render("set/set",{setData});        
    } catch (error) {
        console.log(error.message);
    }
}

async function getCardListFromSet(req,res){
    try{
        const {id} = req.params;
        const setData = await pokemonAPI.fetchCardsFromSet(id);
        res.render("set/cardList", {
            cards: setData.cards,
            setName: setData.name
        });       
    }catch(error){
        console.log(error.message);
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
    res.render("collection/collection",{cardInfo});
}

// saves a card in database
async function saveCardToCollection(req, res){
    const {cardId, cardName, cardPicture, cardPrice, expansionId, apiSetId, setName, setLogo} = req.body;
    let expansionDb = null;
    if(apiSetId){
        expansionDb = await db.saveExpansionToDatabase(apiSetId, setName, setLogo);
    };
    const saveCard = await db.saveCardToDatabase(cardId, cardName, cardPicture, cardPrice, expansionId);
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



module.exports = {
    getSearchedCard,
    cardDetails,
    getListOfSets,
    getCardListFromSet,
    showCollection,
    saveCardToCollection,
    updateCollection,
    deleteCard,
}