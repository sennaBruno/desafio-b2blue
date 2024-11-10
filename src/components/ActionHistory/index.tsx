import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
} from '@mui/material';
import { Action } from '../../types/action';
import { memo } from 'react';

interface ActionHistoryProps {
  actions: Action[];
}

/**
 * Componente ActionHistory
 *
 * Exibe uma tabela com o histórico de todas as ações realizadas no sistema.
 * Funcionalidades:
 * - Listagem cronológica de ações
 * - Diferenciação entre tipos de ações (alertas/coletas)
 * - Formatação de data/hora
 *
 * @param {Action[]} actions - Array de ações a serem exibidas
 */
export const ActionHistory = memo(function ActionHistory({ actions }: ActionHistoryProps) {
  const sortedActions = [...actions].sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  return (
    <Paper sx={{ mt: 4, p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="h2">
          Histórico de Ações
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Total de registros: {actions.length}
        </Typography>
      </Box>

      <TableContainer sx={{ maxHeight: 400 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Data/Hora</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Estação</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Tipo</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Ocupação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedActions.map((action) => (
              <TableRow
                key={action.id}
                sx={{
                  '&:hover': { backgroundColor: 'action.hover' },
                  backgroundColor: action.type === 'ALERT' ? 'warning.lighter' : 'inherit',
                }}
              >
                <TableCell>{new Date(action.timestamp).toLocaleString('pt-BR')}</TableCell>
                <TableCell>{action.stationName}</TableCell>
                <TableCell>
                  {action.type === 'ALERT' ? 'Alerta de Coleta' : 'Coleta Realizada'}
                </TableCell>
                <TableCell>{action.occupancyPercentage}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
});
