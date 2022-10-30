import React, { useState } from 'react';

import EmployeeListItem from './EmployeeListItem';
import employeeData from '../data/data';
import { employeeDataArray } from '../model/employeeType';
import { useEmployees } from '../contexts/EmployeesContext';

const EmployeeList: React.FC = () => {
  //useState for employeeData with typescript
  // const [employees, setEmployees] = useState<employeeDataArray>(employeeData);

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
