import { Grid, Box, Typography } from '@mui/material';
import { EstacaoArmazenamento } from '../EstacaoArmazenamento';
import { useStation } from '../../contexts/StationContext';
import { ActionHistory } from '../ActionHistory';

/**
 * Componente PainelControle
 *
 * Componente principal que gerencia a exibição e organização de todas as estações de resíduos.
 * Responsável por:
 * - Layout responsivo das estações
 * - Integração com o contexto global
 * - Exibição do histórico de ações
 */
export function PainelControle() {
  const { stations, alerts, actions, updateStationOccupancy, confirmCollection } = useStation();

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
            <EstacaoArmazenamento
              station={station}
              onSliderChange={updateStationOccupancy}
              onCollectionConfirm={confirmCollection}
              showAlert={alerts[station.id]}
            />
          </Grid>
        ))}
      </Grid>

      <ActionHistory actions={actions} />
    </Box>
  );
}
