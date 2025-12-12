const {Client} = require("pg");

const SQL = ``; // insert the data from the API to the correct tables using INSER INTO 

async function main(){
    console.log("seeding...");
    const client = new Client({
        connectionString: DATABASE_URL
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");    
}

main();