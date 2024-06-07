const express = require("express");
const router = express.Router();

const cardCtrl = require("../controllers/card");

const auth = require("../middelware/auth");
const date = require("../middelware/date");

router.get("/", auth, cardCtrl.findCard);
router.get("/:id", auth, cardCtrl.findOneCard);
router.post("/", cardCtrl.createCard);
router.put("/:id", auth, cardCtrl.updateCard);
router.delete("/:id", auth, cardCtrl.deleteCard);

module.exports = router;
