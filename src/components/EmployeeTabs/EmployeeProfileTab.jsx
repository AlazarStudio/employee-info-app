import { Box, Paper, Typography, Avatar, Stack, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeProfileTab = ({ employee }) => {
  const isOwner = Number(localStorage.getItem('currentEmployeeId')) === employee.id;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: employee.name,
    position: employee.position,
    email: employee.email,
    phone: employee.phone,
    info: employee.info,
    login: employee.login, // добавляем логин
    password: employee.password, // добавляем пароль
  });

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = () => {
    const list = JSON.parse(localStorage.getItem('employees')) || [];
    const updated = list.map((e) =>
      e.id === employee.id ? { ...e, ...form } : e
    );
    localStorage.setItem('employees', JSON.stringify(updated));
    alert('Данные сохранены');
  };

  return (
    <Box sx={{ px: 2, py: 3, maxWidth: 420, mx: 'auto' }}>
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Stack spacing={2} alignItems="center">
          <Avatar src={employee.image} sx={{ width: 100, height: 100 }}>
            {employee.name?.[0]}
          </Avatar>
          <Typography variant="h6">{form.name}</Typography>
          <Typography variant="body1" color="text.secondary">
            {form.position}
          </Typography>

          {/* Редактируемые поля только для сотрудника, который сам себя редактирует */}
          <TextField
            label="Имя"
            value={form.name}
            onChange={handleChange('name')}
            fullWidth
            disabled={!isOwner}
            sx={{ mb: 1 }}
          />
          <TextField
            label="Должность"
            value={form.position}
            onChange={handleChange('position')}
            fullWidth
            disabled={!isOwner}
            sx={{ mb: 1 }}
          />
          <TextField
            label="Email"
            value={form.email}
            onChange={handleChange('email')}
            fullWidth
            disabled={!isOwner}
            sx={{ mb: 1 }}
          />
          <TextField
            label="Телефон"
            value={form.phone}
            onChange={handleChange('phone')}
            fullWidth
            disabled={!isOwner}
            sx={{ mb: 1 }}
          />
          <TextField
            label="Доп. информация"
            value={form.info}
            onChange={handleChange('info')}
            fullWidth
            multiline
            rows={2}
            disabled={!isOwner}
            sx={{ mb: 1 }}
          />
          
          {/* Логин и пароль, редактируемые только для себя */}
          {isOwner && (
            <>
              <TextField
                label="Логин"
                value={form.login}
                onChange={handleChange('login')}
                fullWidth
                disabled={!isOwner}
                sx={{ mb: 1 }}
              />
              <TextField
                label="Пароль"
                type="password"
                value={form.password}
                onChange={handleChange('password')}
                fullWidth
                disabled={!isOwner}
                sx={{ mb: 1 }}
              />
            </>
          )}

          {/* Кнопка сохранения данных только для себя */}
          {isOwner && (
            <Button variant="contained" fullWidth onClick={handleSave}>
              Сохранить
            </Button>
          )}

          {/* Кнопка выхода */}
          <Button
            onClick={() => {
              localStorage.removeItem('currentEmployeeId');
              localStorage.removeItem('isAdmin');
              navigate('/login');
            }}
            color="error"
            variant="outlined"
            fullWidth
          >
            Выйти
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default EmployeeProfileTab;
