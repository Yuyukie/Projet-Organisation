const Card = require("../models/Card");

exports.findCard = (req, res, next) => {
  Card.find()
    .then((cards) => {
      res.status(200).json(cards);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.findOneCard = (req, res, next) => {
  Card.findOne({
    _id: req.params.id,
  })
    .then((card) => {
      res.status(200).json(card);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.createCard = (req, res, next) => {
  const card = new Card({
    title: req.body.title,
    description: req.body.description,
  });
  card
    .save()
    .then(() => {
      res.status(201).json({
        message: "Post saved successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.updateCard = (req, res, next) => {
  const card = new Card({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId,
  });
  Card.updateOne({ _id: req.params.id }, card)
    .then(() => {
      res.status(201).json({
        message: "Card updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.deleteCard = (req, res, next) => {
  Card.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "Deleted!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
