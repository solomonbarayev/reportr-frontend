import React from 'react';
import { IEmployee } from '../../model/EmployeeData';
import './EmployeeOption.css';

interface Props {
  handleEmployeeCheckboxes: (e: React.ChangeEvent<HTMLInputElement>) => void;
  employee: IEmployee;
  checkIfEmployeeChecked: (id: string) => boolean;
}

const EmployeeOption = ({
  employee,
  handleEmployeeCheckboxes,
  checkIfEmployeeChecked,
}: Props) => {
  return (
    <li>
      <input
        type="checkbox"
        id={employee._id}
        name={employee._id}
        onChange={handleEmployeeCheckboxes}
        checked={checkIfEmployeeChecked(employee._id)}
      />
      <label
        htmlFor={
          employee._id
        }>{`${employee.firstName} ${employee.lastName}`}</label>
    </li>
  );
};

export default EmployeeOption;
