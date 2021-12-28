export class Ifolders{
  public name!:String;
  public id!:number[];
  constructor(name: string, id: number[])
  {
    this.name = name
    this.id = id
  }
}