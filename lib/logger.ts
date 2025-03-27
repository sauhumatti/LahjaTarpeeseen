const isDev = process.env.NODE_ENV === 'development';

export const logger = {
  log: (message: string, ...args: any[]) => {
    if (isDev) {
      console.log(message, ...args);
    }
  },
  warn: (message: string, ...args: any[]) => {
    if (isDev) {
      console.warn(message, ...args);
    }
    // TODO: Send to monitoring service in production
  },
  error: (message: string, ...args: any[]) => {
    if (isDev) {
      console.error(message, ...args);
    }
    // TODO: Send to error monitoring service in production
  }
};