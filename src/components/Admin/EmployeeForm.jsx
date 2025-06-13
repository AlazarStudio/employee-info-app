import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  MenuItem,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Delete as DeleteIcon } from '@mui/icons-material';

const transliterate = (text) => {
  const map = {
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd',
    е: 'e', ё: 'e', ж: 'zh', з: 'z', и: 'i',
    й: 'y', к: 'k', л: 'l', м: 'm', н: 'n',
    о: 'o', п: 'p', р: 'r', с: 's', т: 't',
    у: 'u', ф: 'f', х: 'h', ц: 'ts', ч: 'ch',
    ш: 'sh', щ: 'shch', ъ: '', ы: 'y', ь: '',
    э: 'e', ю: 'yu', я: 'ya',
  };

  return text
    .toLowerCase()
    .split('')
    .map((char) => (map[char] !== undefined ? map[char] : char))
    .join('');
};

const generateLogin = (fullName) => {
  const parts = fullName.trim().split(' ');
  if (parts.length < 2) return '';

  const surname = transliterate(parts[0]);
  const initialName = parts[1]?.[0] ? transliterate(parts[1][0]) : '';
  const initialPatronymic = parts[2]?.[0] ? transliterate(parts[2][0]) : '';
  const suffix = Math.floor(100 + Math.random() * 900);

  return `${surname}.${initialName}.${initialPatronymic}${suffix}`;
};

const generatePassword = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

const EmployeeForm = ({ open, onClose, onAdd, departments, defaultDepartmentId = '' }) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [info, setInfo] = useState('');
  const [departmentId, setDepartmentId] = useState(defaultDepartmentId);
  const [image, setImage] = useState(null);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [extraFields, setExtraFields] = useState([]);

  useEffect(() => {
    setDepartmentId(defaultDepartmentId || '');
  }, [defaultDepartmentId]);

  useEffect(() => {
    if (name.trim().length > 3) {
      setLogin(generateLogin(name));
      setPassword(generatePassword());
    }
  }, [name]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!name || !position || !departmentId) {
      alert('Заполните все обязательные поля');
      return;
    }

    const newEmployee = {
      id: Date.now(),
      name,
      position,
      email,
      phone,
      info,
      departmentId,
      image,
      login,
      password,
      extra: extraFields.filter(field => field.label.trim() && field.value.trim()),
    };

    onAdd(newEmployee);
    onClose();

    // Reset fields
    setName('');
    setPosition('');
    setEmail('');
    setPhone('');
    setInfo('');
    setDepartmentId('');
    setImage(null);
    setLogin('');
    setPassword('');
    setExtraFields([]);
  };

  const addExtraField = () => {
    setExtraFields([...extraFields, { label: '', value: '' }]);
  };

  const updateExtraField = (index, field, value) => {
    const updated = [...extraFields];
    updated[index][field] = value;
    setExtraFields(updated);
  };

  const removeExtraField = (index) => {
    const updated = [...extraFields];
    updated.splice(index, 1);
    setExtraFields(updated);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Добавить сотрудника</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField label="ФИО" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
          <TextField label="Должность" value={position} onChange={(e) => setPosition(e.target.value)} fullWidth />
          <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
          <TextField label="Телефон" value={phone} onChange={(e) => setPhone(e.target.value)} fullWidth />
          <TextField
            label="Отдел"
            value={departmentId}
            onChange={(e) => setDepartmentId(e.target.value)}
            select
            fullWidth
          >
            {departments.map((d) => (
              <MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Доп. информация"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            multiline rows={2}
            fullWidth
          />

          <Button component="label" variant="outlined">
            Загрузить фото
            <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
          </Button>

          {image && (
            <Box>
              <Typography variant="body2">Превью:</Typography>
              <Box
                component="img"
                src={image}
                sx={{
                  width: '100%',
                  maxHeight: 200,
                  objectFit: 'cover',
                  borderRadius: 2,
                  mt: 1,
                }}
              />
            </Box>
          )}

          {login && password && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2">Сгенерированные данные:</Typography>
              <Typography variant="body2">Логин: <b>{login}</b></Typography>
              <Typography variant="body2">Пароль: <b>{password}</b></Typography>
            </Box>
          )}

          <Typography variant="subtitle2" sx={{ mt: 3 }}>
            Дополнительные поля
          </Typography>
          {extraFields.map((field, index) => (
            <Box key={index} sx={{ position: 'relative', border: '1px solid #ccc', borderRadius: 2, p: 2 }}>
              <TextField
                label="Название поля"
                value={field.label}
                onChange={(e) => updateExtraField(index, 'label', e.target.value)}
                fullWidth
                sx={{ mb: 1 }}
              />
              <TextField
                label="Значение"
                value={field.value}
                onChange={(e) => updateExtraField(index, 'value', e.target.value)}
                fullWidth
              />
              <IconButton
                onClick={() => removeExtraField(index)}
                color="error"
                sx={{ position: 'absolute', top: 8, right: 8 }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Button variant="outlined" onClick={addExtraField}>
            + Добавить поле
          </Button>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="secondary">Отмена</Button>
        <Button onClick={handleSubmit} variant="contained">Сохранить</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmployeeForm;
