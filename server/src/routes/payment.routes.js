const express = require("express");
const router = express.Router();

const payment = require("../controllers/payment.controller");

router.get("/", payment.getPayments);

router.post("/", payment.createPayment);

router.get("/:id", payment.getPayment);

router.put("/:id", payment.editPayment);

router.delete("/:id", payment.deletePayment);

router.delete("/", payment.deletePayments);

module.exports = router;
