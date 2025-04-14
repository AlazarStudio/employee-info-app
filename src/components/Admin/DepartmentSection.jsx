// src/components/Admin/DepartmentSection.jsx
import {
  Box,
  Typography,
  Paper,
  Stack,
  Divider,
  Avatar,
  Button,
} from '@mui/material';
import DepartmentForm from './DepartmentForm';
import EmployeeForm from './EmployeeForm';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DepartmentSection = ({ departments, onAddDepartment }) => {
  const [deptModalOpen, setDeptModalOpen] = useState(false);
  const [employeeModalOpen, setEmployeeModalOpen] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
  const [employees, setEmployees] = useState([]);
  
  const navigate = useNavigate();
  // загрузка сотрудников при монтировании
  useEffect(() => {
    const saved = localStorage.getItem('employees');
    if (saved) setEmployees(JSON.parse(saved));
  }, []);

  const handleAddEmployee = (emp) => {
    const updated = [...employees, emp];
    setEmployees(updated);
    localStorage.setItem('employees', JSON.stringify(updated));
  };

  return (
    <Box
      sx={{
        px: 2,
        py: 3,
        maxWidth: 420,
        mx: 'auto',
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">Отделы и сотрудники</Typography>
        <Button variant="outlined" size="small" onClick={() => setDeptModalOpen(true)}>
          + Отдел
        </Button>
      </Box>

      {departments.length === 0 ? (
        <Typography variant="body2" textAlign="center" color="text.secondary">
          Отделы не добавлены
        </Typography>
      ) : (
        <Stack spacing={3}>
          {departments.map((dep) => (
            <Paper key={dep.id} sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                {dep.name}
              </Typography>
              <Typography variant="body2" mb={1}>{dep.description}</Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" color="text.secondary" mb={1}>
                Сотрудники:
              </Typography>
              <Stack spacing={1} mb={2}>
                {employees.filter(e => e.departmentId === dep.id).length === 0 ? (
                  <Typography variant="body2" color="text.disabled">
                    Пока нет сотрудников
                  </Typography>
                ) : (
                  employees
                    .filter(e => e.departmentId === dep.id)
                    .map(emp => (
                      <Paper
                        key={emp.id}
                        sx={{
                          p: 1,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          borderRadius: 1.5,
                        }}
                        onClick={() => {
                          // localStorage.setItem('selectedEmployeeId', emp.id);
                          navigate(`/employeeProfile/${emp.id}`)
                        }}
                      >
                        <Avatar src={emp.image} alt={emp.name}>
                          {emp.name?.[0]}
                        </Avatar>
                        <Box>
                          <Typography variant="body1" fontWeight={500}>
                            {emp.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {emp.position}
                          </Typography>
                        </Box>
                      </Paper>
                    ))
                )}
              </Stack>
              <Button
                fullWidth
                variant="contained"
                size="small"
                onClick={() => {
                  setSelectedDepartmentId(dep.id);
                  setEmployeeModalOpen(true);
                }}
              >
                + Сотрудник
              </Button>
            </Paper>
          ))}
        </Stack>
      )}

      <DepartmentForm
        open={deptModalOpen}
        onClose={() => setDeptModalOpen(false)}
        onAddDepartment={onAddDepartment}
      />

      <EmployeeForm
        open={employeeModalOpen}
        onClose={() => setEmployeeModalOpen(false)}
        onAdd={handleAddEmployee}
        departments={departments}
        defaultDepartmentId={selectedDepartmentId}
      />
    </Box>
  );
};

export default DepartmentSection;
