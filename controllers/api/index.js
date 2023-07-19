const router = require("express").Router();

const vendorsRoutes = require("./vendorsRoutes");

router.use("/vendors", vendorsRoutes);

module.exports = router;
