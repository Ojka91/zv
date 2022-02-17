import  Truck  from '../Models/Truck';
import { TrucksInstance } from '../Models/TrucksInstance';

const truckInstance: TrucksInstance = TrucksInstance.getInstance();
const truck1: Truck = new Truck(1);
const truck2: Truck = new Truck(2);
const truck3: Truck = new Truck(3);
const truck4: Truck = new Truck(4);



test('Get instance', () => {
   
  expect(TrucksInstance.getInstance()).toStrictEqual(truckInstance);
});

test('Create truck', () => {
  expect(truckInstance.addTruck(truck1)).toStrictEqual(truck1);
});

test('Create second', () => {
  expect(truckInstance.addTruck(truck2)).toStrictEqual(truck2);
});

test('Get truck', () => {
  
  expect(truckInstance.getTruck(1)).toStrictEqual(truck1);
});

test('Get trucks list', () => {

  expect(truckInstance.getTrucks()).toStrictEqual([truck1, truck2]);
});

test('Create truck 3', () => {
  expect(truckInstance.addTruck(truck3)).toStrictEqual(truck3);
});

test('Create truck 4', () => {
  expect(truckInstance.addTruck(truck4)).toStrictEqual(truck4);
});

test('Get trucks list', () => {

  expect(truckInstance.getTrucks()).toStrictEqual([truck1, truck2, truck3, truck4]);
});
