import { createContext, useContext, useState, ReactNode } from 'react';
import { Snackbar, Alert, Fade } from '@mui/material';

interface NotificationContextData {
  showNotification: (message: string, type?: 'success' | 'warning' | 'error') => void;
}

const NotificationContext = createContext<NotificationContextData>({} as NotificationContextData);

interface NotificationProviderProps {
  children: ReactNode;
}

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

  const handleClose = (_: any, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const getAutoHideDuration = (type: 'success' | 'warning' | 'error') => {
    switch (type) {
      case 'warning':
        return 5000;
      case 'success':
      case 'error':
        return 3000;
      default:
        return 3000;
    }
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={getAutoHideDuration(severity)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        ClickAwayListenerProps={{ onClickAway: () => null }}
        TransitionComponent={Fade}
        TransitionProps={{
          enter: true,
          exit: true,
          timeout: {
            enter: 400,
            exit: 300,
          },
        }}
        sx={{
          '& .MuiSnackbarContent-root': {
            transition: 'all 0.3s ease-in-out',
            transform: open ? 'translateY(0)' : 'translateY(-20px)',
          },
        }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={severity}
          variant="filled"
          sx={{
            minWidth: '300px',
            transition: 'all 0.3s ease-in-out',
            opacity: open ? 1 : 0,
            transform: open ? 'scale(1)' : 'scale(0.95)',
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
}

export const useNotification = () => useContext(NotificationContext);
