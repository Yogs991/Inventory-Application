const pokemonAPI = require("../services/pokemonAPI");
const db = require("../db/queries");

// fetches from API a list of pokemon based on name searched e.g. Charizard
async function getSearchedCard(req, res){
    const cardName = req.query.name;
    const page = parseInt(req.query.page) || 1;
    const pageSize = 20;
    if(!cardName){
        return res.render("card/card", {
            cardList: [],
            error: null,
            currentPage: 1,
            hasNextPage: false
        });
    }
    try {
        const cardList = await pokemonAPI.fetchCardsByName(cardName, pageSize, page);
        res.render("card/card", {
            cardList,
            error: null,
            currentPage: page,
            hasNextPage: cardList.length === pageSize,
            searchName: cardName
        });       
    } catch (error) {
        console.error("Controller caught: ", error.message);
        res.render("card/card",{
            cardList: [],
            error: "Something went wrong",
            currentPage: 1,
            hasNextPage: false
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


async function getListOfSets(req, res){
    try {
        const setData = await pokemonAPI.fetchSetFromAPI();
        const groupedBySeries = setData.reduce((acc, set)=>{
            const series = set.series || "Other";
            if(!acc[series]){
                acc[series] = [];
            }
            acc[series].push(set);
            return acc;
        },{});

        const series = Object.entries(groupedBySeries).map(([series, sets])=>{
            const sortedSets = sets.sort((a,b)=>{
                return new Date(b.releaseDate) - new Date(a.releaseDate);
            });

            const latestDate = sortedSets[0]?.releaseDate || "";

            return {
                name: series, 
                sets: sortedSets,
                latestDate: latestDate
            }
        });
        
        const seriesArray = series.reverse();
        res.render("set/set", {seriesArray});
    } catch (err) {
        console.error(err);        
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
    const cardInfo = cards.map(card=>({
        id: card.id,
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
    console.log("Card saved to db succesfully");    
    res.redirect("/collection");
}

//update card info - probably the price based on market value later on 
async function updateCollection(req,res){}

//deletes a card from database
async function deleteCard(req,res){
    const cardId = req.params.id;
    try{
        await db.deleteCard(cardId);
        res.redirect("/collection");
    }catch(err){
        res.status(500).send("failed to delete card");
    }
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