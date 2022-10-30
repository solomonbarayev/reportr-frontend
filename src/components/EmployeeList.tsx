import React from 'react';

import EmployeeListItem from './EmployeeListItem';
import { useEmployees } from '../contexts/EmployeesContext';

const EmployeeList: React.FC = () => {
  const { employees } = useEmployees();

  return (
    <section className="employees">
      <h1 className="employees__title">Employee List</h1>
      <ul className="employees__list">
        {employees.map((employee) => (
          <EmployeeListItem key={employee._id} employee={employee} />
        ))}
      </ul>
    </section>
  );
};

export default EmployeeList;
