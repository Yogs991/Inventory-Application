const pool = require("./pool");

// async function getAllCards(){
//     const {rows} = await pool.query("SELECT * FROM card");
//     return rows;
// }

// async function getAllCardSets(){
//     const {rows} = await pool.query("SELECT * FROM expansion");
//     return rows;
// }

// async function insertCard(id){
//     const {rows} = await pool.query("INSERT INTO card(id) VALUES ($1)",[id]);
//     return rows;
// }

// async function insertSet(id){
//     const {rows} = await pool.query("INSERT INTO expansion(id) VALUE($1)",[id]);
//     return rows;
// }

// module.exports={
//     getAllCards,
//     getAllCardSets,
//     insertCard,
//     insertSet
// }

async function getCard(apiId){
    const {rows} = await pool.query("SELECT * FROM card WHERE api_cardid = $1", [apiId]);
    return rows;
}

async function getAllCards(){
    const {rows} = await pool.query("SELECT * FROM card");
    return rows;
}

async function saveExpansionToDatabase(apiExpansionId, name, logo){
    const {rows} = await pool.query("INSERT INTO expansion(api_setid, name, logo) VALUES($1, $2, $3)",[apiExpansionId, name, logo]);
    return rows;
}

async function saveCardToDatabase(api_id, name, picture, price, expansionId){
    const {rows} = await pool.query("INSERT INTO card(api_cardid, name, picture, price, expansionId) VALUES ($1, $2, $3, $4, $5)",[api_id, name, picture, price, expansionId]);
    return rows;
}

async function searchByExpansion(){
    const {rows} = await pool.query("SELECT * FROM card INNER JOIN expansion ON card.expansionId = expansion.api_setid");
    return rows;
}

//Note: ignore for now, can't find a use for this
async function updateCollection(){
    //use UPDATE
}

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
