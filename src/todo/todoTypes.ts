export enum Status {
  completed = "completed",
  pending = "pending"
}





export interface ITodo {
  task: string;
  deadline: string;
  status: Status

}