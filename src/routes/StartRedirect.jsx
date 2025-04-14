import { Navigate } from 'react-router-dom';

const StartRedirect = () => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const employeeId = localStorage.getItem('currentEmployeeId');

  if (isAdmin) {
    return <Navigate to="/admin" />;
  }

  if (employeeId) {
    return <Navigate to={`/employee/${employeeId}`} />;
  }

  return <Navigate to="/login" />;
};

export default StartRedirect;
