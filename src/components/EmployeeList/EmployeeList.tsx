import React, { useState } from 'react';

import './EmployeeList.css';
import EmployeeListItem from '../EmployeeListItem/EmployeeListItem';
import employeeData from '../../data/data';
import { employeeDataArray } from '../../model/employeeType';
import { useEmployees } from '../../contexts/EmployeesContext';

const EmployeeList: React.FC = () => {
  //useState for employeeData with typescript
  // const [employees, setEmployees] = useState<employeeDataArray>(employeeData);

  const { employees } = useEmployees();

  return (
    <div>
      <h1>Employee List</h1>
      <ul>
        {/* <EmployeeListItem employees={employees} setEmployees={setEmployees} />
         */}
        {employees.map((employee) => (
          <EmployeeListItem key={employee._id} employee={employee} />
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
