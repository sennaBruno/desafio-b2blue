import { createContext, useContext, useState, ReactNode } from 'react';
import { Snackbar, Alert } from '@mui/material';

interface NotificationContextData {
  showNotification: (message: string, type?: 'success' | 'warning' | 'error') => void;
}

const NotificationContext = createContext<NotificationContextData>({} as NotificationContextData);

interface NotificationProviderProps {
  children: ReactNode;
}

/**
 * Contexto de Notificações
 *
 * Gerencia o sistema de notificações da aplicação.
 * Funcionalidades:
 * - Exibição de mensagens temporárias
 * - Diferentes tipos de alertas (sucesso, aviso, erro)
 * - Posicionamento consistente das notificações
 *
 * @example
 * const { showNotification } = useNotification();
 * showNotification('Operação realizada com sucesso', 'success');
 */
export function NotificationProvider({ children }: NotificationProviderProps) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<'success' | 'warning' | 'error'>('success');

  const showNotification = (
    newMessage: string,
    type: 'success' | 'warning' | 'error' = 'success'
  ) => {
    setMessage(newMessage);
    setSeverity(type);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity={severity} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}
