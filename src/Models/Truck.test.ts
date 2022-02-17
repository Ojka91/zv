import Parcel from './Parcel';
import  Truck  from './Truck';


test('Get id truck', () => {
  const truck: Truck = new Truck(1);

  expect(truck.getId()).toStrictEqual(1);
});

test('Load and retrieve parcel weight', () => {
  const truck: Truck = new Truck(1);

  const parcel: Parcel = new Parcel(12, "chair", 1);
  const parcel2: Parcel = new Parcel(25, "chair", 2);

  truck.loadParcel(parcel);
  truck.loadParcel(parcel2);
  expect(truck.getTruckWeight()).toStrictEqual(37);
});

test('Get number of parcel', () => {
  const truck: Truck = new Truck(1);

  const parcel: Parcel = new Parcel(12, "chair", 1);
  const parcel2: Parcel = new Parcel(25, "chair", 2);
  const parcel3: Parcel = new Parcel(35, "chair", 3);
  const parcel4: Parcel = new Parcel(45, "chair", 4);

  truck.loadParcel(parcel);
  truck.loadParcel(parcel2);
  truck.loadParcel(parcel3);
  truck.loadParcel(parcel4);
  truck.unloadParcel(3)
  expect(truck.getNumberParcels()).toStrictEqual(3);
});
