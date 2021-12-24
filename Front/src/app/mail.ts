export interface Mail{
  id: number;
  from: string;
  to: string;
  subject: string;
  mailContent:string;
  time: string;
  importance:number;
}