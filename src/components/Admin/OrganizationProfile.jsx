import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  IconButton,
} from '@mui/material';
import OrganizationForm from './OrganizationForm';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const OrganizationProfile = ({ organization, onSave }) => {
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  if (!organization || editing) {
    return (
      <Box p={2}>
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          mb={2}
        >
          <IconButton onClick={() => setEditing(false)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6">
            {organization ? 'Редактирование' : 'Создание организации'}
          </Typography>
        </Box>

        <OrganizationForm
          onSave={(org) => {
            onSave(org);
            setEditing(false);
          }}
          initialData={organization}
        />
      </Box>
    );
  }

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
        <Typography variant="h5">Организация</Typography>
        <Button onClick={handleLogout} size="small" color="secondary">
          Выйти
        </Button>
      </Box>

      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Stack spacing={2}>
          <Typography variant="h6" textAlign="center">
            {organization.name}
          </Typography>
          {organization.image && (
            <Box
              component="img"
              src={organization.image}
              alt="Организация"
              sx={{
                width: '100%',
                borderRadius: 2,
                objectFit: 'cover',
                maxHeight: 200,
              }}
            />
          )}
          <Typography>{organization.description}</Typography>
          <Typography variant="body2" color="text.secondary">
            Адрес: {organization.address}
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setEditing(true)}
          >
            Редактировать
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default OrganizationProfile;
