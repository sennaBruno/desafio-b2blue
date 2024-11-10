import { useState } from 'react';
import { Box, Typography, Slider, Button, Alert, Paper, Fade } from '@mui/material';
import RecyclingIcon from '@mui/icons-material/Recycling';
import WarningIcon from '@mui/icons-material/Warning';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Station } from '../../types/station';
import { OCCUPANCY_THRESHOLD } from '../../constants';
import { ConfirmCollectionDialog } from '../ConfirmCollectionDialog';

interface EstacaoArmazenamentoProps {
  station: Station;
  onSliderChange: (stationId: number, newValue: number) => void;
  onCollectionConfirm: (stationId: number) => void;
  showAlert: boolean;
}

/**
 * Componente EstacaoArmazenamento
 *
 * Responsável por renderizar e gerenciar uma estação de resíduos individual.
 * Inclui controles para ajuste de ocupação, alertas e confirmação de coleta.
 *
 * @param {Station} station - Dados da estação
 * @param {Function} onSliderChange - Callback para atualização do nível de ocupação
 * @param {Function} onCollectionConfirm - Callback para confirmação de coleta
 * @param {boolean} showAlert - Controle de exibição do alerta
 */
export function EstacaoArmazenamento({
  station,
  onSliderChange,
  onCollectionConfirm,
  showAlert,
}: EstacaoArmazenamentoProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            color: 'secondary.main',
          }}
        >
          <RecyclingIcon fontSize="large" />
        </Box>

        <Typography variant="h6" component="h2" gutterBottom color="primary" sx={{ pr: 5 }}>
          {station.name}
        </Typography>

        <Box sx={{ width: '100%', mb: 2 }}>
          <Typography
            variant="body2"
            color={station.occupancyPercentage >= OCCUPANCY_THRESHOLD ? 'error' : 'text.secondary'}
            gutterBottom
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            {station.occupancyPercentage >= OCCUPANCY_THRESHOLD && <WarningIcon fontSize="small" />}
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
              '& .MuiSlider-thumb': {
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  boxShadow: '0 0 0 8px rgba(25, 118, 210, 0.16)',
                },
              },
              '& .MuiSlider-track': {
                transition: 'all 0.2s ease-in-out',
              },
            }}
          />
        </Box>

        {showAlert && (
          <Fade in timeout={300}>
            <Box sx={{ mt: 'auto' }}>
              <Alert severity="warning" sx={{ mb: 2 }}>
                Nível crítico! Coleta necessária.
              </Alert>
              <Button
                variant="contained"
                color="success"
                fullWidth
                onClick={() => setIsDialogOpen(true)}
                startIcon={<LocalShippingIcon />}
              >
                Confirmar Coleta
              </Button>
            </Box>
          </Fade>
        )}
      </Paper>

      <ConfirmCollectionDialog
        open={isDialogOpen}
        stationName={station.name}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={() => {
          onCollectionConfirm(station.id);
          setIsDialogOpen(false);
        }}
      />
    </>
  );
}
