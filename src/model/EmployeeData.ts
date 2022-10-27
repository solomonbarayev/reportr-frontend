import { ITask } from './TaskData';

export interface IEmployee {
  _id: string;
  picture: string;
  name: string;
  position: string;
  managerId: string;
  myTasks: ITask[];
  email: string;
  __v: number;
}
