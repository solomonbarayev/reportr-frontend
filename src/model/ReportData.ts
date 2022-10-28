export interface IReport {
  _id: string;
  managerId: string;
  text: string;
  date: string;
  employeeId: {
    _id: string;
    firstName: string;
    lastName: string;
  };
}
