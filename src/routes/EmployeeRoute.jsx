import { Navigate, useParams } from 'react-router-dom';

const EmployeeRoute = ({ children }) => {
  const currentId = Number(localStorage.getItem('currentEmployeeId'));
  const { id } = useParams();

  // Пускаем только если ID совпадает с авторизованным
  if (currentId === Number(id)) {
    return children;
  }

  // Но если админ — тоже пускаем
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  return isAdmin ? children : <Navigate to="/login" />;
};

export default EmployeeRoute;
