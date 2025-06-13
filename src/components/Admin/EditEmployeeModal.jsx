import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Stack,
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Delete as DeleteIcon } from '@mui/icons-material';

const EditEmployeeModal = ({ open, onClose, employee, onSave }) => {
  const [form, setForm] = useState({ ...employee });
  const [extraFields, setExtraFields] = useState(employee.extra || []);

  const handleFieldChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setForm({ ...form, image: reader.result });
    reader.readAsDataURL(file);
  };

  const updateExtraField = (index, field, value) => {
    const updated = [...extraFields];
    updated[index][field] = value;
    setExtraFields(updated);
  };

  const addExtraField = () => {
    setExtraFields([...extraFields, { label: '', value: '' }]);
  };

  const removeExtraField = (index) => {
    const updated = [...extraFields];
    updated.splice(index, 1);
    setExtraFields(updated);
  };

  const handleSubmit = () => {
    onSave({
      ...form,
      extra: extraFields.filter(f => f.label.trim() && f.value.trim()),
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Редактировать сотрудника</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField label="ФИО" value={form.name} onChange={(e) => handleFieldChange('name', e.target.value)} fullWidth />
          <TextField label="Должность" value={form.position} onChange={(e) => handleFieldChange('position', e.target.value)} fullWidth />
          <TextField label="Email" value={form.email} onChange={(e) => handleFieldChange('email', e.target.value)} fullWidth />
          <TextField label="Телефон" value={form.phone} onChange={(e) => handleFieldChange('phone', e.target.value)} fullWidth />
          <TextField
            label="Отдел"
            value={form.departmentId}
            onChange={(e) => handleFieldChange('departmentId', e.target.value)}
            select
            fullWidth
          >
            {(JSON.parse(localStorage.getItem('departments')) || []).map((d) => (
              <MenuItem key={d.id} value={d.id}>
                {d.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Доп. информация"
            value={form.info}
            onChange={(e) => handleFieldChange('info', e.target.value)}
            multiline rows={2}
            fullWidth
          />
          <TextField
            label="Логин"
            value={form.login}
            onChange={(e) => handleFieldChange('login', e.target.value)}
            fullWidth
          />
          <TextField
            label="Пароль"
            value={form.password}
            onChange={(e) => handleFieldChange('password', e.target.value)}
            fullWidth
          />

          <Button component="label" variant="outlined">
            Заменить фото
            <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
          </Button>

          {form.image && (
            <Box>
              <Typography variant="body2">Превью:</Typography>
              <Box
                component="img"
                src={form.image}
                sx={{ width: '100%', maxHeight: 200, objectFit: 'cover', borderRadius: 2, mt: 1 }}
              />
            </Box>
          )}

          <Typography variant="subtitle2">Дополнительные поля:</Typography>
          {extraFields.map((field, index) => (
            <Box key={index} sx={{ position: 'relative', border: '1px solid #ccc', borderRadius: 2, p: 2 }}>
              <TextField
                label="Название поля"
                value={field.label}
                onChange={(e) => updateExtraField(index, 'label', e.target.value)}
                fullWidth sx={{ mb: 1 }}
              />
              <TextField
                label="Значение"
                value={field.value}
                onChange={(e) => updateExtraField(index, 'value', e.target.value)}
                fullWidth
              />
              <IconButton onClick={() => removeExtraField(index)} sx={{ position: 'absolute', top: 8, right: 8 }} color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Button onClick={addExtraField} variant="outlined">+ Добавить поле</Button>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="secondary">Отмена</Button>
        <Button onClick={handleSubmit} variant="contained">Сохранить</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditEmployeeModal;
