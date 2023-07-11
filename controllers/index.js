const router = require("express").Router();

const streetfoodRoutes = require("./streetfoodRoutes");

router.use("/streetfood", streetfoodRoutes);

module.exports = router;