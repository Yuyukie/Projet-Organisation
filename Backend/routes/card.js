const express = require("express");
const auth = require("auth");
const router = express.Router();

const cardCtrl = require("../controllers/card");

router.get("/", auth, cardCtrl.findCard);
router.get("/:id", auth, cardCtrl.findOneCard);
router.post("/", auth, cardCtrl.createCard);
router.put("/:id", auth, cardCtrl.updateCard);
router.delete("/:id", auth, cardCtrl.deleteCard);

module.exports = router;
