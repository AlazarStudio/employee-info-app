import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import BusinessIcon from '@mui/icons-material/Business';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EmployeeProfileTab from './EmployeeTabs/EmployeeProfileTab';
import EmployeeDepartmentTab from './EmployeeTabs/EmployeeDepartmentTab';
import EmployeeOrganizationTab from './EmployeeTabs/EmployeeOrganizationTab';

const EmployeeDashboard = () => {
  const [tab, setTab] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const found = employees.find((e) => e.id === Number(id));
    if (!found) {
      navigate('/login');
    } else {
      setEmployee(found);
    }
  }, [id]);

  if (!employee) return null;

  return (
    <Box sx={{ pb: 7 }}>
      {/* вкладки */}
      {tab === 0 && <EmployeeProfileTab employee={employee} />}
      {tab === 1 && <EmployeeDepartmentTab employee={employee} />}
      {tab === 2 && <EmployeeOrganizationTab />}

      {/* нижняя навигация */}
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          borderTop: '1px solid #ccc',
          zIndex: 2
        }}
        elevation={3}
      >
        <BottomNavigation
          value={tab}
          onChange={(e, newValue) => setTab(newValue)}
          showLabels
        >
          <BottomNavigationAction label="Профиль" icon={<PersonIcon />} />
          <BottomNavigationAction label="Отдел" icon={<GroupsIcon />} />
          <BottomNavigationAction label="Организация" icon={<BusinessIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default EmployeeDashboard;
