import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
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
  return (
    <Paper sx={{ mt: 4, p: 2 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Histórico de Ações
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Data/Hora</TableCell>
              <TableCell>Estação</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Ocupação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {actions.map((action) => (
              <TableRow key={action.id}>
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
