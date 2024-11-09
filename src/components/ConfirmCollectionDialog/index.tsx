import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

interface ConfirmCollectionDialogProps {
  open: boolean;
  stationName: string;
  onClose: () => void;
  onConfirm: () => void;
}

/**
 * Componente ConfirmCollectionDialog
 *
 * Modal de confirmação para ações de coleta.
 * Características:
 * - Feedback visual claro da ação
 * - Opções de confirmar/cancelar
 * - Mensagem personalizada por estação
 *
 * @param {boolean} open - Controle de visibilidade do diálogo
 * @param {string} stationName - Nome da estação para personalização da mensagem
 * @param {Function} onClose - Callback para fechar o diálogo
 * @param {Function} onConfirm - Callback para confirmar a ação
 */
export function ConfirmCollectionDialog({
  open,
  stationName,
  onClose,
  onConfirm,
}: ConfirmCollectionDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar Coleta</DialogTitle>
      <DialogContent>
        <Typography>
          Você está prestes a confirmar a coleta de resíduos da {stationName}. Esta ação irá
          redefinir o nível de ocupação para 0%.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button onClick={onConfirm} color="success" variant="contained">
          Confirmar Coleta
        </Button>
      </DialogActions>
    </Dialog>
  );
}
