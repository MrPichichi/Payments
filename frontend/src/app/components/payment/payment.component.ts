import { Component, OnInit } from '@angular/core';
import { PaymentService } from "../../services/payment.service";
import { NgForm } from "@angular/forms";
import { Payment } from "../../models/payment";

var editando=false;
var creando=false;
var valorUF=0;
var hrs=0;
var uf=[];
var total=0;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers: [PaymentService],
})
export class PaymentComponent implements OnInit {

  constructor(private paymentService: PaymentService) {}
 
  ngOnInit() {
    this.getPayments();
    this.resetForm();
    this.paymentService.servicesRequest=0;
    //seteamos null para desplegar bien el formulario
    this.paymentService.selectedPayment.serviceHour=null;
  }
// por efecto de utilidad decidi implementar una funcion consume la API 
// mediante fetch
 getUfserver(form?: NgForm){
   if(form.value.date){
    //var date='24-7-2021'
    fetch('https://mindicador.cl/api/uf/'+form.value.date)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        uf=(Object.values(data.serie[0]));
        valorUF=Number.parseFloat(uf[1]);
        //console.log("EXTRAIDO CON EXITO: -->: "+form.value.date+" "+valorUF);
        this.paymentService.selectedPayment.dayAmountUf = valorUF;
        return valorUF;
      });
    }
    else{
      window.alert("ERROR- Verifica la fecha ingresada");
    }
  }
  // Calcula el total del servicio y setea las horas de este al payment actual
  calcular(form?: NgForm){
    if(form.value.dayAmountUf && form.value.serviceHour){
      var auxTot=Number(valorUF)/Number.parseFloat(form.value.serviceHour);
      total=Math.round(auxTot * 100) / 100
      //console.log("TOTAL: "+auxTot+ " si "+total);
      this.paymentService.selectedPayment.amountOfService = total;
      hrs=Number.parseFloat(form.value.serviceHour);
      this.paymentService.selectedPayment.serviceHour = hrs;
      if(creando==false && editando==false){
        creando=true;
      }
    }
    else{
      window.alert("ERROR- Verifica los datos ingresados");
    }
  }
  // añade un nuevo payment en base a un Formulario o guarda los cambios relizados en un payment
  // ya existente
  addPayment(form?: NgForm) {
    if(total!=0 && valorUF!=0){
      if(this.validarForm(form)==true){
            if (form.value._id && editando==true) {
               
                editando=false;
                this.paymentService.putPayment(form.value,valorUF,total).subscribe((res) => {
                
                this.getPayments();
                this.resetForm(form);
              });
              valorUF=0;
              total=0;
              window.alert("Payment editado con exito");
            } 
            if(creando==true){      
                this.paymentService.postPayment(form.value,valorUF,total,hrs).subscribe((res) => {
                  this.getPayments();
                  this.resetForm(form);
                });
                valorUF=0;
                total=0;
                creando=false;
                window.alert("Payment creado con exito");
            }
      }
    }
    else{
      window.alert("ERROR- Verifica los datos del formulario");
    }
      // console.log("flag !!!!")
  }
  // obtengo los payments ya creados del servidor 
  getPayments() {
    // console.log("OBTENIENDO PAYMENTS");
    this.paymentService.getPayments().subscribe((res) => {
      this.paymentService.payments = res;
    });
  }
  //establece el payment selecccionado para editarlo 
  editPayment(payment: Payment) {
    this.paymentService.selectedPayment = payment;
    this.paymentService.selectedPayment.dayAmountUf=0;
    this.paymentService.selectedPayment.amountOfService=0;
    editando=true;
  }
  //elimina un payment en base a su ID 
  deletePayment(_id: string, form: NgForm) {
    if (confirm("Do you want to delete it?")) {
      this.paymentService.deletePayment(_id).subscribe((res) => {
        this.getPayments();
        this.resetForm(form);
      });
    }
  }
  //resetea los campos del formulario
  resetForm(form?: NgForm) {
    if (form && editando == false){
      form.reset();
    }
  }
  //validacion de la estructura de un formulario
  validarForm(form?: NgForm) {
      if(form.value.name.length == 0 || form.value.lastName.length == 0 || form.value.description.length == 0 ||
        form.value.serviceHour <=0 || form.value.date.length<10){
          return false;
        }
        else{
          return true;
        }
  }
}
