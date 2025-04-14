import { Box, Paper, Typography, Stack } from '@mui/material';
import { useEffect, useState } from 'react';

const EmployeeOrganizationTab = () => {
  const [organization, setOrganization] = useState(null);

  useEffect(() => {
    const orgData = JSON.parse(localStorage.getItem('organization'));
    setOrganization(orgData);
  }, []);

  if (!organization) return null;

  return (
    <Box sx={{ px: 2, py: 3, maxWidth: 420, mx: 'auto' }}>
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" textAlign="center" mb={2}>
          Организация
        </Typography>
        <Stack spacing={2}>
          <Typography variant="subtitle1" fontWeight="bold">
            {organization.name}
          </Typography>
          <Typography variant="body1">{organization.description}</Typography>
          <Typography variant="body2" color="text.secondary">
            Адрес: {organization.address}
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default EmployeeOrganizationTab;
