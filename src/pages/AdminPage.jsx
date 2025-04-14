// src/pages/AdminPage.jsx
import {
  Box,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrganizationProfile from '../components/Admin/OrganizationProfile';
import DepartmentSection from '../components/Admin/DepartmentSection';

const AdminPage = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  const [organization, setOrganization] = useState(null);
  const [departments, setDepartments] = useState([]);

  // Подгрузка данных и вкладки при загрузке страницы
  useEffect(() => {
    const savedOrg = localStorage.getItem('organization');
    const savedDeps = localStorage.getItem('departments');
    const savedTab = localStorage.getItem('adminTab');

    if (savedOrg) setOrganization(JSON.parse(savedOrg));
    if (savedDeps) setDepartments(JSON.parse(savedDeps));
    if (savedTab) setValue(Number(savedTab));
  }, []);

  const handleTabChange = (e, newValue) => {
    setValue(newValue);
    localStorage.setItem('adminTab', newValue);
  };

  const handleAddDepartment = (dep) => {
    const updated = [...departments, dep];
    setDepartments(updated);
    localStorage.setItem('departments', JSON.stringify(updated));
  };

  const handleSaveOrganization = (org) => {
    setOrganization(org);
    localStorage.setItem('organization', JSON.stringify(org));
  };

  if (!organization) {
    return (
      <OrganizationProfile
        organization={null}
        onSave={handleSaveOrganization}
      />
    );
  }

  return (
    <Box
      sx={{
        pb: 7,
        backgroundColor: 'background.default',
        minHeight: '100vh',
      }}
    >
      {value === 0 && (
        <OrganizationProfile
          organization={organization}
          onSave={handleSaveOrganization}
        />
      )}
      {value === 1 && (
        <DepartmentSection
          departments={departments}
          onAddDepartment={handleAddDepartment}
        />
      )}

      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          borderTop: '1px solid #ccc',
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={handleTabChange}
        >
          <BottomNavigationAction label="Организация" icon={<BusinessIcon />} />
          <BottomNavigationAction label="Отделы" icon={<AccountTreeIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default AdminPage;
