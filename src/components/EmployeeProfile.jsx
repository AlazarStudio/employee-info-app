import {
  Box,
  Typography,
  Paper,
  Avatar,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Delete as DeleteIcon } from '@mui/icons-material';
import EditEmployeeModal from '../components/Admin/EditEmployeeModal';

const EmployeeProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('employees')) || [];
    const found = list.find((e) => e.id === Number(id));
    if (found) {
      setEmployee(found);
    }
  }, [id]);

  const handleUpdate = (updatedEmployee) => {
    const list = JSON.parse(localStorage.getItem('employees')) || [];
    const updatedList = list.map(e => e.id === updatedEmployee.id ? updatedEmployee : e);
    localStorage.setItem('employees', JSON.stringify(updatedList));
    setEmployee(updatedEmployee);
    setOpenEdit(false);
  };

  if (!employee) {
    return (
      <Box p={3}>
        <Typography>Сотрудник не найден</Typography>
        <Button onClick={() => navigate(-1)}>Назад</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ px: 2, py: 3, maxWidth: 420, mx: 'auto' }}>
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Stack spacing={2} alignItems="center">
          <Avatar src={employee.image} sx={{ width: 100, height: 100 }}>
            {employee.name?.[0]}
          </Avatar>
          <Typography variant="h6">{employee.name}</Typography>
          <Typography variant="body1" color="text.secondary">
            {employee.position}
          </Typography>

          <Box width="100%">
            <Typography variant="subtitle2">Контакты:</Typography>
            <Typography variant="body2">📧 {employee.email || '—'}</Typography>
            <Typography variant="body2">📞 {employee.phone || '—'}</Typography>
          </Box>

          <Box width="100%">
            <Typography variant="subtitle2">Доп. информация:</Typography>
            <Typography variant="body2">
              {employee.info || 'Информация отсутствует'}
            </Typography>
          </Box>

          <Box width="100%">
            <Typography variant="subtitle2">Доступ:</Typography>
            <Typography variant="body2">Логин: <b>{employee.login}</b></Typography>
            <Typography variant="body2">Пароль: <b>{employee.password}</b></Typography>
          </Box>

          {employee.extra && employee.extra.length > 0 && (
            <Box width="100%">
              <Typography variant="subtitle2">Дополнительные данные:</Typography>
              <Stack spacing={1} mt={1}>
                {employee.extra.map((field, index) => (
                  <Box key={index}>
                    <Typography variant="body2" color="text.secondary">
                      {field.label}
                    </Typography>
                    <Typography variant="body2">
                      {field.value}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          )}

          <Stack direction="row" spacing={1} width="100%">
            <Button onClick={() => navigate(-1)} variant="outlined" fullWidth>
              Назад
            </Button>
            <Button onClick={() => setOpenEdit(true)} variant="contained" fullWidth>
              Редактировать
            </Button>
          </Stack>
        </Stack>
      </Paper>

      {openEdit && (
        <EditEmployeeModal
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          employee={employee}
          onSave={handleUpdate}
        />
      )}
    </Box>
  );
};

export default EmployeeProfile;
