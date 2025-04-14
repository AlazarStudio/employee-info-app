import { Box, Typography, Paper, Avatar, Stack, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const EmployeeProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // <-- получаем id из URL
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('employees')) || [];
    const found = list.find((e) => e.id === Number(id));
    if (found) {
      setEmployee(found);
    }
  }, [id]);

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
          <Avatar
            src={employee.image}
            sx={{ width: 100, height: 100 }}
          >
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

          <Button onClick={() => navigate(-1)} variant="outlined" fullWidth>
            Назад
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default EmployeeProfile;
