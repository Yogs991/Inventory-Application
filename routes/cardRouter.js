const express = require("express");
const { Router } = require("express");
const router = Router();
const cardController = require("../controller/cardController");


router.get('/',(req,res)=>{
    res.render("index");
});
router.get("/cardList", cardController.getCardList);
router.get("/expansion", cardController.getExpansion);
router.get("/collection", cardController.showCollection);
router.post("/cardList/:id",cardController.saveCardToCollection);
router.delete("/collection/:id",cardController.deleteCard);
router.get("/cardDetails/:id", cardController.cardDetails);


module.exports = router;