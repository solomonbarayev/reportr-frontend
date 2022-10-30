import { Link } from 'react-router-dom';
import { IEmployee } from '../model/EmployeeData';
import { AiOutlineUser } from 'react-icons/ai';

interface Props {
  employee: IEmployee;
}

const EmployeeListItem = ({ employee }: Props) => {
  return (
    <li className="employees__list-item">
      <div className="employees__list-item-container">
        <div className="employees__list-item-text">
          <p className="employees__text employees__text_type_name">
            <span className="employees__text_bold">Name:</span>{' '}
            {`${employee.firstName} ${employee.lastName}`}
          </p>
          <p className="employees__text employees__text_type_position">
            <span className="employees__text_bold">Position:</span>{' '}
            {employee.position}
          </p>
        </div>
        <Link to={`/employee/${employee._id}`}>
          <button className="btn employees__view-btn">
            <AiOutlineUser className="employees__view-icon" />
            <span className="employees__view-btn-text">View</span>
          </button>
        </Link>
      </div>
    </li>
  );
};

export default EmployeeListItem;
