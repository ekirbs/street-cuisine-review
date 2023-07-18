const axios = require("axios");
const router = require("express").Router();

router.get("/:identifier", async (req, res) => {
  try {

    const { identifier } = req.params;
    const streetfoodApiUrl = `http://data.streetfoodapp.com/1.1/schedule/${identifier}/`;
    const response = await axios.get(streetfoodApiUrl);
    res.status(200).json(response.data);
    console.log(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:city", async (req, res) => {
  try {
    const { city } = req.params;
    const streetfoodApiUrl = `http://data.streetfoodapp.com/1.1/schedule/${city}/`
    const response = await axios.get(streetfoodApiUrl);
    res.status(200).json(response.data);
    console.log(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const streetfoodApiUrl = `http://data.streetfoodapp.com/1.1/schedule/boston/`;
    const response = await axios.get(streetfoodApiUrl);
    res.status(200).json(response.data);
    console.log(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
