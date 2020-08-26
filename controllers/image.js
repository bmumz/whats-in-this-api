const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: process.env.API_CLARIFAI,
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FOOD_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("Unable to reach API"));
};

const handleImageSubmit = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json("Unable to get number of entries."));
};

module.exports = {
  handleImageSubmit: handleImageSubmit,
  handleApiCall: handleApiCall,
};
