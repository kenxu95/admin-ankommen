export class User {
  username: string;
  password: string; 
  firstname: string;
  lastname: string;
  email: string;

  myTasks: any;
  participatingTasks: any;
  specificallyRequest : any;

  constructor (
    public notificationFrequency: number = 0,
    public description?: string,
    public assets?: any,
    public locations?: any,
    public image?: any
  ){ } 
}