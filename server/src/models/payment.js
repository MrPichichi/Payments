const mongoose = require("mongoose");
const { Schema } = mongoose;

const paymentSchema = new Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    description: { type: String, required: true },
    serviceHour: { type: Number, required: true},
    amountOfService: { type: Number, required: false },
    date: { type: String, required: true},
    dayAmountUf: { type: Number, required: true },
  }
);

module.exports = mongoose.model("Payment", paymentSchema);
