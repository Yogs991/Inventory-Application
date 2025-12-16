const {Client} = require("pg");

const SQL = `
    CREATE TABLE IF NOT EXISTS expansion(
        id INT NOT NULL PRIMARY KEY,
        api_setid VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(200) NOT NULL,
        logo VARCHAR(200)
    );

    CREATE TABLE IF NOT EXISTS card(
        id INT NOT NULL PRIMARY KEY,
        api_cardid VARCHAR(20) NOT NULL UNIQUE,
        name VARCHAR(50) NOT NULL,
        picture VARCHAR(200),
        price DECIMAL(6,2),
        expansionId VARCHAR(50) NOT NULL,
        FOREIGN KEY (expansionId) REFERENCES expansion(api_setid)
    );

    INSERT INTO expansion(api_setid, name, logo) VALUES ($1, $2, $3)
        ('swsh1'),
        ('Sword & Shield'),
        ('https://images.pokemontcg.io/swsh1/logo.png')
    ON CONFLICT (api_setid) DO NOTHING;

    INSERT INTO card (api_cardid, name, picture, price, expansionId) VALUES ($1, $2, $3, $4, $5)
        ('xy1-1'),
        ('Venusaur-EX'),
        ('https://images.pokemontcg.io/xy1/1.png'),
        (3.32),
        ('xy1')
    ON CONFLICT (api_cardid) DO NOTHING;
`; 

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