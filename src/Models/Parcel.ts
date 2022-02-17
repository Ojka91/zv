
export default class Parcel {

  private id: number;
  private weight: number;
  private name: string;

  constructor(weight: number, name: string, id: number) {
    this.weight = weight;
    this.name = name;
    this.id = id;
  }
   
  public getName() {
    return this.name;
  }

  public getWeight() {
    return this.weight;
  }

  public getId() {
    return this.id;
  }
  
}