/**
 * Centralized logging utility
 * Provides consistent logging across the application
 * In production, can be extended to send logs to external services (Sentry, etc.)
 */

const isDev = process.env.NODE_ENV === 'development';

type LogLevel = 'error' | 'warn' | 'info' | 'debug';

interface LogData {
  message: string;
  data?: unknown;
  timestamp?: Date;
  level?: LogLevel;
}

function formatLog(level: LogLevel, message: string, data?: unknown): LogData {
  return {
    level,
    message,
    data,
    timestamp: new Date(),
  };
}

export const logger = {
  /**
   * Log error messages
   * In production, these should be sent to an error tracking service
   */
  error: (message: string, error?: unknown) => {
    const logData = formatLog('error', message, error);

    if (isDev) {
      console.error(`[ERROR] ${message}`, error);
    } else {
      // In production, send to error tracking service
      // Example: Sentry.captureException(error, { extra: { message } });
      console.error(logData);
    }
  },

  /**
   * Log warning messages
   */
  warn: (message: string, data?: unknown) => {
    const logData = formatLog('warn', message, data);

    if (isDev) {
      console.warn(`[WARN] ${message}`, data);
    } else {
      // In production, optionally send warnings to monitoring service
      console.warn(logData);
    }
  },

  /**
   * Log informational messages (development only)
   */
  info: (message: string, data?: unknown) => {
    if (isDev) {
      console.log(`[INFO] ${message}`, data);
    }
  },

  /**
   * Log debug messages (development only)
   */
  debug: (message: string, data?: unknown) => {
    if (isDev) {
      console.log(`[DEBUG] ${message}`, data);
    }
  },
};
