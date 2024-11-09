import { Box, Typography, Slider, Button, Alert, Paper } from '@mui/material';
import { Station } from '../../types/station';
import { OCCUPANCY_THRESHOLD } from '../../constants';

interface EstacaoArmazenamentoProps {
  station: Station;
  onSliderChange: (stationId: number, newValue: number) => void;
  onCollectionConfirm: (stationId: number) => void;
  showAlert: boolean;
}

export function EstacaoArmazenamento({
  station,
  onSliderChange,
  onCollectionConfirm,
  showAlert,
}: EstacaoArmazenamentoProps) {
  return (
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
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Nível de Ocupação: {station.occupancyPercentage}%
        </Typography>

        <Slider
          value={station.occupancyPercentage}
          onChange={(_, value) => onSliderChange(station.id, value as number)}
          valueLabelDisplay="auto"
          marks
          sx={{
            color:
              station.occupancyPercentage >= OCCUPANCY_THRESHOLD ? 'error.main' : 'primary.main',
          }}
        />
      </Box>

      {showAlert && (
        <Box sx={{ mt: 'auto' }}>
          <Alert severity="warning" sx={{ mb: 2 }}>
            Nível crítico! Coleta necessária.
          </Alert>
          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={() => onCollectionConfirm(station.id)}
          >
            Confirmar Coleta
          </Button>
        </Box>
      )}
    </Paper>
  );
}
