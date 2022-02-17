import APIError from "../service/APIError";
import Truck from "./Truck";

export class TrucksInstance {
    private static instance: TrucksInstance;
    private static trucks: Truck[];
 
    private constructor() {
        TrucksInstance.trucks = [];
     }


    public static getInstance(): TrucksInstance {
        if (!TrucksInstance.instance) {
            TrucksInstance.instance = new TrucksInstance();
        }

        return TrucksInstance.instance;
    }

    public addTruck(truck: Truck) {
        if((TrucksInstance.trucks.filter(truckFromInstance => truckFromInstance.getId() === truck.getId()))[0]){
            throw new APIError().badRequest("Truck id already exist") 
        }

        TrucksInstance.trucks.push(truck);
        return truck;
    }

    public getTrucks(): Truck[] {
        return TrucksInstance.trucks;
    }
   
    public getTruck(id: number): Truck {
        if (TrucksInstance.trucks) {
            const truck = (TrucksInstance.trucks.filter(truck => truck.getId() === id))[0];
            if (truck) return truck;
        } 
        throw new APIError().notFound("No truck with given id")    
    }

}