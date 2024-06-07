const express = require("express");
const router = express.Router();

const cardCtrl = require("../controllers/card");

const auth = require("../middelware/auth");

router.get("/", cardCtrl.findCard);
router.get("/:id", cardCtrl.findOneCard);
router.post("/", cardCtrl.createCard);
router.put("/:id", auth, cardCtrl.updateCard);
router.delete("/:id", auth, cardCtrl.deleteCard);

module.exports = router;
