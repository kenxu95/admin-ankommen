export class Task {
  id: number;
  description: string;
  assets: Array<string>;

  constructor(
    public startTime = new Date(), // TODO: FIX THIS SHIT
    public endTime = new Date()
  ){}
}

