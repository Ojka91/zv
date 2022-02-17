import Parcel from '@App/Models/Parcel';
import { TrucksInstance } from '@App/Models/TrucksInstance';
import { Request } from 'express';
import Truck from '../../Models/Truck';

export default class TruckController {
  private truckInstance: TrucksInstance;
  constructor() {
    this.truckInstance = TrucksInstance.getInstance();
   }

  public async get(req: Request) {
    return this.truckInstance.getTruck(parseInt(req.params.id));
  }

  public async getAllTrucks(req: Request) {
    return this.truckInstance.getTrucks();
  }

  public async getNumberParcels(req: Request) {
    const truck: Truck = this.truckInstance.getTruck(parseInt(req.params.id));
    return truck.getNumberParcels();
  }

  public async getWeight(req: Request) {
    const truck: Truck = this.truckInstance.getTruck(parseInt(req.params.id));
    return truck.getTruckWeight();
  }

  public async loadTruck(req: Request) {
    const parcelId = req.body.id;
    const weight = req.body.weight;
    const name = req.body.name;
    const truckId = parseInt(req.params.id);

    const parcel: Parcel = new Parcel(weight, name, parcelId);

    const truck: Truck = this.truckInstance.getTruck(truckId);
    truck.loadParcel(parcel);

    return truck;
  }

  public async unloadTruck(req: Request) {
    const parcelId = req.body.id;
    const truckId = parseInt(req.params.id);


    const truck: Truck = this.truckInstance.getTruck(truckId);
    truck.unloadParcel(parcelId);

    return truck;
  }


  public async create(req: Request) {
    const id = req.body.id;
  
    const truck = new Truck(id);

    this.truckInstance.addTruck(truck);
  }
  
}
