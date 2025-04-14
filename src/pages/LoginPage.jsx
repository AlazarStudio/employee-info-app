import { Box, Button, TextField, Typography, Paper, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LoginPage = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const trimmedLogin = login.trim();
    const trimmedPassword = password.trim();

    // 1. Админ
    if (trimmedLogin === 'admin' && trimmedPassword === 'admin') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
      return;
    }

    // 2. Сотрудник
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const user = employees.find(
      (e) => e.login === trimmedLogin && e.password === trimmedPassword
    );

    if (user) {
      localStorage.setItem('currentEmployeeId', user.id);
      navigate(`/employee/${user.id}`);
    } else {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <Box
      sx={{
        px: 2,
        py: 4,
        maxWidth: 420,
        mx: 'auto',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Paper sx={{ p: 4, borderRadius: 3, width: '100%' }}>
        <Typography variant="h6" textAlign="center" mb={2}>
          Вход в систему
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Логин"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            fullWidth
          />
          <TextField
            label="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          {error && (
            <Typography variant="body2" color="error" textAlign="center">
              {error}
            </Typography>
          )}
          <Button variant="contained" onClick={handleLogin} fullWidth>
            Войти
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default LoginPage;
