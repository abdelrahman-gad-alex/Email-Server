export class Mail{
  public id!: number;
  public from!: string;
  public to!: string[];
  public subject!: string;
  public mailContent!:string;
  public time!: string;
  public importance!:number;
}