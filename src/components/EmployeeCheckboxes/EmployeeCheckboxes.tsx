import React from 'react';
import { useEmployees } from '../../contexts/EmployeesContext';
import { IEmployee } from '../../model/EmployeeData';
import api from '../../utils/api';
import EmployeeOption from '../EmployeeOption/EmployeeOption';

interface Props {
  handleEmployeeCheckboxes: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checkIfEmployeeChecked: (id: string) => boolean;
}

const EmployeeCheckboxes = ({
  handleEmployeeCheckboxes,
  checkIfEmployeeChecked,
}: Props) => {
  const { employees } = useEmployees();

  return (
    <div className="employee-checkboxes">
      <ul className="employee-checkboxes__list">
        {employees.map((employee) => (
          <EmployeeOption
            employee={employee}
            key={employee._id}
            handleEmployeeCheckboxes={handleEmployeeCheckboxes}
            checkIfEmployeeChecked={checkIfEmployeeChecked}
          />
        ))}
      </ul>
    </div>
  );
};

export default EmployeeCheckboxes;
