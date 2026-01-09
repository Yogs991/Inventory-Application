const pool = require("./pool");

// select card from database based on id
async function getCard(apiId){
    const {rows} = await pool.query("SELECT * FROM card WHERE api_cardid = $1", [apiId]);
    return rows;
}

// selecting all cards from database
async function getAllCards(){
    const {rows} = await pool.query("SELECT * FROM card");
    return rows;
}

// saves pokemon expansion e.g. pokemon base set to database
async function saveExpansionToDatabase(api_setid, name, logo){
    const {rows} = await pool.query("INSERT INTO expansion(api_setid, name, logo) VALUES($1, $2, $3) ON CONFLICT (api_setid) DO NOTHING RETURNING *",[api_setid, name, logo]);
    return rows;
}

// saves card to database
async function saveCardToDatabase(api_cardid, name, image, price, expansionId){
    const {rows} = await pool.query("INSERT INTO card(api_cardid, name, picture, price, expansionId) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (api_cardid) DO NOTHING RETURNING *",[api_cardid, name, image, price, expansionId]);
    return rows;
}

// selects based on expansion search
async function searchByExpansion(){
    const {rows} = await pool.query("SELECT * FROM card INNER JOIN expansion ON card.expansionId = expansion.api_setid");
    return rows;
}

// No use for now - Will update price on current market value(eBay, tcgplayer) when i add the feature 
async function updateCollection(){
    //use UPDATE
}

// delete card from database
async function deleteCard(id){
    const {rows} = await pool.query("DELETE FROM card WHERE card = $1",[id]);
    return rows;
}
    
module.exports = {
    getCard,
    getAllCards,
    saveExpansionToDatabase,
    saveCardToDatabase,
    searchByExpansion,
    updateCollection,
    deleteCard
}
