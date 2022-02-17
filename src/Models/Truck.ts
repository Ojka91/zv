import Parcel from "./Parcel";

export default class Truck {

    private id: number;
    private load: Parcel[];
    private weight: number;
    private parcelNumber: number;

    constructor(id: number) {
        this.id = id;
        this.load = [];
        this.weight = 0;
        this.parcelNumber = 0;
    }
   
    public loadParcel(parcel: Parcel) {
        this.load.push(parcel);
        this.weight = this.weight + parcel.getWeight();
        this.parcelNumber = this.parcelNumber + 1;
    }

    public getNumberParcels() {
        return this.load.length;
    }

    public unloadParcel(id: number) {
        for (let x = 0; x < this.load.length; x++) {
            if (this.load[x].getId() === id) {
                this.weight = this.weight - this.load[x].getWeight();
                this.parcelNumber = this.parcelNumber - 1;
                this.load.splice(x,1)
            }            
        }
    }
    
    public getTruckWeight() {
        let weight = 0;
        this.load.forEach(parcel => {
            weight = weight + parcel.getWeight()
        });
        return weight;
    }

    public getId() {
        return this.id;
    }
  
  }