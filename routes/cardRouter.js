const express = require("express");
const { Router } = require("express");
const router = Router();
const cardController = require("../controller/cardController");

//router.get cardController.getCard
//router.get cardController.getExpansion
//router.get cardController.showCollection
//router.post cardController.saveCardToCollection
//router.patch cardController.updateCollection ?
//router.delete cardController.deleteCard

router.get("/", cardController.getCardList);
router.get("/expansion", cardController.getExpansion);
router.get("/collection", cardController.showCollection);
router.post("/:id",cardController.saveCardToCollection);
router.delete("/:id",cardController.deleteCard);

module.exports = router;