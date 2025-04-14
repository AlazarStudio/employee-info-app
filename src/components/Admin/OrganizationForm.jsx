import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
} from '@mui/material';
import { useState, useEffect } from 'react';

const OrganizationForm = ({ onSave, initialData = null }) => {
  const [orgName, setOrgName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (initialData) {
      setOrgName(initialData.name || '');
      setDescription(initialData.description || '');
      setAddress(initialData.address || '');
      setImage(initialData.image || null); // уже base64
    }
  }, [initialData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!orgName.trim()) {
      alert('Введите название организации');
      return;
    }

    const newOrg = {
      id: Date.now(),
      name: orgName,
      description,
      address,
      image, // сохраняем как base64
    };

    onSave(newOrg);

    // сброс полей
    setOrgName('');
    setDescription('');
    setAddress('');
    setImage(null);
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 420,
        mx: 'auto',
        mt: 4,
      }}
    >
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h6" mb={2} textAlign="center">
          {initialData ? 'Редактировать организацию' : 'Создание организации'}
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Название"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
            fullWidth
          />
          <TextField
            label="Адрес"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
          />
          <Button variant="outlined" component="label">
            Загрузить изображение
            <input hidden type="file" accept="image/*" onChange={handleFileChange} />
          </Button>

          {image && (
            <Box>
              <Typography variant="body2">Превью:</Typography>
              <Box
                component="img"
                src={image}
                alt="preview"
                sx={{
                  mt: 1,
                  width: '100%',
                  maxHeight: 200,
                  objectFit: 'cover',
                  borderRadius: 2,
                }}
              />
            </Box>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            fullWidth
            sx={{ py: 1.5, fontSize: 16 }}
          >
            Сохранить
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default OrganizationForm;
