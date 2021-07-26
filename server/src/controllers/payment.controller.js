const Payment = require("../models/Payment");
var https = require('https');
const paymentCtrl = {};

paymentCtrl.createPayment = async (req, res, next) => {
    //console.log("DATOS: "+req.body);
    const payment = new Payment({
    name: req.body.name,
    lastName: req.body.lastName,
    description: req.body.description,
    serviceHour: req.body.serviceHour,
    amountOfService: req.body.amountOfService,
    date: req.body.date,
    dayAmountUf: req.body.dayAmountUf,
  });
  
  await payment.save();
  res.json({ status: "201 Payment created" });
};
//extrae los payments del servidor
paymentCtrl.getPayments = async (req, res, next) => {
  const payments = await Payment.find();
  res.json(payments);
};
//Extrae un determinado payment del servidor en base al ID
paymentCtrl.getPayment = async (req, res, next) => {
  const { id } = req.params;
  if(await Payment.findById(id)){
    const payment = await Payment.findById(id);
    res.json(payment);
    res.json("200 OK")
  }
  else{
    res.json({ status: "404 Not Found" });
  }
};
//edita un determinado payment en base al ID
paymentCtrl.editPayment = async (req, res, next) => {
  const { id } = req.params;
  if(await Payment.findByIdAndUpdate(id, {$set: req.body}, {new: true})){
    res.json({ status: "200 Payment Updated" });
  }
  else{
    res.json({ status: "404 Not Found" });
  }
};
//elimina un determinado payment en base a su ID
paymentCtrl.deletePayment = async (req, res, next) => {
  if(await Payment.findByIdAndRemove(req.params.id)){
    res.json({ status: "200 Payment Deleted" });
  }
  else{
    res.json({ status: "404 Not Found" });
  }
};
//Elimina todos los payments de la BD usado para las pruebas
paymentCtrl.deletePayments = async (req, res, next) => {
  const payments = await Payment.find();
  paymentsID=[];
  payments.forEach(element => paymentsID.push(element.id));
  //console.log(paymentsID.length);
  for(x=paymentsID.length;x>=0;x--){
    await Payment.findByIdAndRemove(paymentsID[x]);
  }
  //console.log(paymentsID);
  res.json("429 TOO MANY REQUEST");
};

module.exports = paymentCtrl;
