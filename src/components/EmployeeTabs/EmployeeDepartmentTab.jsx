import { Box, Paper, Typography, Stack, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useState, useEffect } from 'react';

const EmployeeDepartmentTab = ({ employee }) => {
  const [colleagues, setColleagues] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const departmentColleagues = employees.filter(
      (e) => e.departmentId === employee.departmentId && e.id !== employee.id
    );
    setColleagues(departmentColleagues);
  }, [employee]);

  const handleProfileClick = (colleague) => {
    setSelectedEmployee(colleague);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEmployee(null);
  };

  return (
    <Box sx={{ px: 2, py: 3, maxWidth: 420, mx: 'auto' }}>
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" textAlign="center" mb={2}>
          Сотрудники отдела
        </Typography>
        <Stack spacing={2}>
          {colleagues.length > 0 ? (
            colleagues.map((colleague) => (
              <Button
                key={colleague.id}
                onClick={() => handleProfileClick(colleague)}
                fullWidth
                variant="outlined"
              >
                {colleague.name}
              </Button>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              Нет других сотрудников в вашем отделе
            </Typography>
          )}
        </Stack>
      </Paper>

      {/* Модалка с информацией о сотруднике */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Информация о сотруднике</DialogTitle>
        <DialogContent>
          {selectedEmployee && (
            <Box>
              <Typography variant="h6">{selectedEmployee.name}</Typography>
              <Typography variant="body1">{selectedEmployee.position}</Typography>
              <Typography variant="body2" color="text.secondary">
                Email: {selectedEmployee.email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Телефон: {selectedEmployee.phone}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Доп. информация: {selectedEmployee.info || '—'}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmployeeDepartmentTab;
