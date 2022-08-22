const express = require("express");
const router = express.Router({ mergeParams: true });
const cors = require("cors");

router.use("/auth", cors(), require("./auth.routes"));
router.use("/products", cors(), require("./good.routes"));
router.use("/tag", cors(), require("./tag.routes"));
router.use("/type", cors(), require("./type.routes"));
router.use("/user", cors(), require("./user.routes"));
router.use("/cart", cors(), require("./cart.routes"));

module.exports = router;
