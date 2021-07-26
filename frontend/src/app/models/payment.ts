export class Payment {
    constructor(_id = "", name = "", lastName = "",description = "", serviceHour=0,
        date = "") {
        this._id = _id;
        this.name = name;
        this.lastName= lastName;
        this.description = description;
        this.serviceHour = serviceHour;
        this.date=date;
        
    }
    
    _id: String;
    name: String;
    lastName: String;
    description: String;
    serviceHour: Number;
    amountOfService:Number;
    date: String;
    dayAmountUf: Number;
     
}
