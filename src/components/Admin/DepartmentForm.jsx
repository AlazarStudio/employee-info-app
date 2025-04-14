// src/components/Admin/DepartmentForm.jsx
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Stack,
  } from '@mui/material';
  import { useState } from 'react';
  
  const DepartmentForm = ({ open, onClose, onAddDepartment }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
  
    const handleAdd = () => {
      if (!name.trim()) {
        alert('Введите название отдела');
        return;
      }
  
      const newDepartment = {
        id: Date.now(),
        name,
        description,
      };
  
      onAddDepartment(newDepartment);
      setName('');
      setDescription('');
      onClose();
    };
  
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
        <DialogTitle>Добавить отдел</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Название отдела"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Описание"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={2}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} color="secondary">
            Отмена
          </Button>
          <Button onClick={handleAdd} variant="contained" color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default DepartmentForm;
  