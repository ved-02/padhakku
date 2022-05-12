const { Router } = require("express");
const {couponValidate} = require("../controllers/couponValidate");

const router = Router();

router.get("/validate", couponValidate);

module.exports = router;