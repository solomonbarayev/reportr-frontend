import { ITask } from './TaskData';

export interface IEmployee {
  _id: string;
  picture: string;
  firstName: string;
  lastName: string;
  position: string;
  managerId: string;
  isManager: boolean;
  myTasks: ITask[];
  email: string;
  __v: number;
}
