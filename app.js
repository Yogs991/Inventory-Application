const express = require("express");
const app = express();
const path = require("node:path");
const cardRouter = require("./routes/cardRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use("/", cardRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT,(error)=>{
    if(error){
        throw error;
    }
    console.log(`Express app listening on port ${PORT}`);
    
})