import { Grid, Box, Typography, Slider, Button, Alert, Paper, LinearProgress } from '@mui/material';
import { Station } from '../../types/station';
import { useState } from 'react';
import { OCCUPANCY_THRESHOLD } from '../../constants';

const initialStations: Station[] = [
  {
    id: 1,
    name: 'Estação 1',
    occupancyPercentage: 0,
    status: 'normal',
  },
  {
    id: 2,
    name: 'Estação 2',
    occupancyPercentage: 0,
    status: 'normal',
  },
  {
    id: 3,
    name: 'Estação 3',
    occupancyPercentage: 0,
    status: 'normal',
  },
];

export function PainelControle() {
  const [stations, setStations] = useState<Station[]>(initialStations);
  const [alerts, setAlerts] = useState<{ [key: number]: boolean }>({});

  const handleSliderChange = (stationId: number, newValue: number) => {
    setStations((prevStations) =>
      prevStations.map((station) =>
        station.id === stationId
          ? {
              ...station,
              occupancyPercentage: newValue,
              status: newValue >= OCCUPANCY_THRESHOLD ? 'warning' : 'normal',
            }
          : station
      )
    );

    if (newValue >= OCCUPANCY_THRESHOLD && !alerts[stationId]) {
      setAlerts((prev) => ({ ...prev, [stationId]: true }));
    }
  };

  const handleCollectionConfirm = (stationId: number) => {
    setStations((prevStations) =>
      prevStations.map((station) =>
        station.id === stationId
          ? { ...station, occupancyPercentage: 0, status: 'normal' }
          : station
      )
    );
    setAlerts((prev) => ({ ...prev, [stationId]: false }));
  };

  return (
    <Box sx={{ width: '100%', p: { xs: 2, sm: 3 } }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        color="primary"
        sx={{ mb: 4, fontWeight: 'bold' }}
      >
        Controle de Estações de Resíduos
      </Typography>

      <Grid container spacing={3}>
        {stations.map((station) => (
          <Grid item xs={12} sm={6} md={4} key={station.id}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6,
                },
              }}
            >
              <Typography variant="h6" component="h2" gutterBottom color="primary">
                {station.name}
              </Typography>

              <Box sx={{ width: '100%', mb: 2 }}>
                <LinearProgress
                  variant="determinate"
                  value={station.occupancyPercentage}
                  color={station.status === 'warning' ? 'error' : 'primary'}
                  sx={{ height: 10, borderRadius: 5 }}
                />
              </Box>

              <Typography variant="body2" color="text.secondary" gutterBottom>
                Nível de Ocupação
              </Typography>

              <Slider
                value={station.occupancyPercentage}
                onChange={(_, value) => handleSliderChange(station.id, value as number)}
                valueLabelDisplay="auto"
                marks
                sx={{
                  color:
                    station.occupancyPercentage >= OCCUPANCY_THRESHOLD
                      ? 'error.main'
                      : 'primary.main',
                }}
              />

              <Typography
                variant="h5"
                align="center"
                sx={{
                  fontWeight: 'bold',
                  color:
                    station.occupancyPercentage >= OCCUPANCY_THRESHOLD
                      ? 'error.main'
                      : 'primary.main',
                }}
              >
                {station.occupancyPercentage}%
              </Typography>

              {alerts[station.id] && (
                <Box sx={{ mt: 2 }}>
                  <Alert severity="warning" sx={{ mb: 2 }}>
                    Nível crítico! Coleta necessária.
                  </Alert>
                  <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    onClick={() => handleCollectionConfirm(station.id)}
                    sx={{
                      mt: 1,
                      textTransform: 'none',
                      fontWeight: 'bold',
                    }}
                  >
                    Confirmar Coleta
                  </Button>
                </Box>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
