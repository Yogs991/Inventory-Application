const express = require("express");
const { Router } = require("express");
const router = Router();
const cardController = require("../controller/cardController");


router.get('/',(req,res)=>{
    res.render("index");
});
router.get("/card", cardController.getSearchedCard);
router.get("/cardDetails/:id", cardController.cardDetails);

router.get("/set", cardController.getListOfSets);
router.get("/card/cardList/:id", cardController.getCardListFromSet);

router.get("/collection", cardController.showCollection);

router.post("/cardList/:id",cardController.saveCardToCollection);
router.delete("/collection/:id",cardController.deleteCard);


module.exports = router;