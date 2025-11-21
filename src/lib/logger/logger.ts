import { LogLevel, LogContext, LogEntry, LoggerConfig } from './types';
import { writeToFile, cleanOldLogs } from './fileLogger';
import { sendToExternal, configureExternalLogger } from './externalLogger';

class Logger {
  private config: LoggerConfig;
  private isDevelopment: boolean;

  constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development';
    
    this.config = {
      level: (process.env.LOG_LEVEL as LogLevel) || LogLevel.INFO,
      enableConsole: this.isDevelopment,
      enableFile: this.isDevelopment,
      enableExternal: !this.isDevelopment,
      externalEndpoint: process.env.EXTERNAL_LOG_ENDPOINT,
      externalApiKey: process.env.EXTERNAL_LOG_API_KEY,
    };

    // Configure external logger if in production
    if (this.config.enableExternal && this.config.externalEndpoint) {
      configureExternalLogger(
        this.config.externalEndpoint,
        this.config.externalApiKey
      );
    }

    // Clean old logs on startup (only in development)
    if (this.isDevelopment) {
      cleanOldLogs().catch(() => {
        // Ignore errors
      });
    }
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR];
    const currentLevelIndex = levels.indexOf(this.config.level);
    const messageLevelIndex = levels.indexOf(level);
    return messageLevelIndex >= currentLevelIndex;
  }

  private formatTimestamp(): string {
    return new Date().toISOString();
  }

  private getColorForLevel(level: LogLevel): string {
    switch (level) {
      case LogLevel.DEBUG:
        return '\x1b[36m'; // Cyan
      case LogLevel.INFO:
        return '\x1b[32m'; // Green
      case LogLevel.WARN:
        return '\x1b[33m'; // Yellow
      case LogLevel.ERROR:
        return '\x1b[31m'; // Red
      default:
        return '\x1b[0m'; // Reset
    }
  }

  private logToConsole(entry: LogEntry): void {
    if (!this.config.enableConsole) return;

    const color = this.getColorForLevel(entry.level);
    const reset = '\x1b[0m';
    const timestamp = new Date(entry.timestamp).toLocaleTimeString();
    
    console.log(
      `${color}[${timestamp}] [${entry.level.toUpperCase()}]${reset} ${entry.message}`
    );

    if (entry.context) {
      console.log('Context:', entry.context);
    }

    if (entry.error) {
      console.error('Error:', entry.error);
    }
  }

  private createLogEntry(
    level: LogLevel,
    message: string,
    context?: LogContext,
    error?: Error
  ): LogEntry {
    return {
      timestamp: this.formatTimestamp(),
      level,
      message,
      context,
      error: error
        ? {
            name: error.name,
            message: error.message,
            stack: error.stack,
          }
        : undefined,
    };
  }

  private async log(
    level: LogLevel,
    message: string,
    context?: LogContext,
    error?: Error
  ): Promise<void> {
    if (!this.shouldLog(level)) {
      return;
    }

    const entry = this.createLogEntry(level, message, context, error);

    // Log to console (development)
    this.logToConsole(entry);

    // Log to file (development)
    if (this.config.enableFile) {
      writeToFile(entry).catch(() => {
        // Ignore errors
      });
    }

    // Send to external service (production)
    if (this.config.enableExternal) {
      sendToExternal(entry).catch(() => {
        // Ignore errors
      });
    }
  }

  async debug(message: string, context?: LogContext): Promise<void> {
    await this.log(LogLevel.DEBUG, message, context);
  }

  async info(message: string, context?: LogContext): Promise<void> {
    await this.log(LogLevel.INFO, message, context);
  }

  async warn(message: string, context?: LogContext): Promise<void> {
    await this.log(LogLevel.WARN, message, context);
  }

  async error(message: string, error?: Error, context?: LogContext): Promise<void> {
    await this.log(LogLevel.ERROR, message, context, error);
  }
}

// Export singleton instance
export const logger = new Logger();
export default logger;

