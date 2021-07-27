import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Payment} from "../models/payment";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {selectedPayment: Payment;
  ufValue=0;
  payments: Payment[];
  datos=[];
  servicesRequest=0;
  readonly URL_API = "http://localhost:3000/api/payments";


  constructor(private http: HttpClient) {
    this.selectedPayment = new Payment();
  }
  //enlaza servicios con servidor para agregar un payment
  postPayment(payment: Payment, valorUF : Number, total : Number, hrs : Number) {
    console.log("request POST ");
    this.contador();
    payment.serviceHour=hrs;
    payment.dayAmountUf=valorUF;
    payment.amountOfService=total;
    this.selectedPayment = new Payment();
    return this.http.post(this.URL_API, payment);
  }
  //para facilitar el conteo de los servicios, verificar consola
  contador(){
    if(this.servicesRequest<10){
      this.servicesRequest=this.servicesRequest+1;
      console.log("request solicitados "+this.servicesRequest);
      
    }
    else{
      window.alert(" 429 TOO MANY REQUEST");
      this.servicesRequest=0;
      console.log("request reset");
    }
  }
  //enlaza servicio con servidor para obtener un conjunto de payments
  getPayments() {
    console.log("request GET ");
    this.contador();
    this.servicesRequest+=1;
    return this.http.get<Payment[]>(this.URL_API);
  }
  //enlaza servicio con servidor para cambiar el valor de un payment
  putPayment(payment: Payment, valorUF : Number, total : Number) {
    console.log("request PUT ");
    this.contador();
    payment.dayAmountUf=valorUF;
    payment.amountOfService=total;
    //this.selectedPayment = new Payment();
    console.log("selcted payment: "+this.selectedPayment.amountOfService);
    return this.http.put(this.URL_API + `/${payment._id}`, payment);
    
  }
  //enlaza servico con servidor para eliminar un payment en base a su ID
  deletePayment(_id: string) {
    console.log("request DELETE ");
    this.contador();
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
