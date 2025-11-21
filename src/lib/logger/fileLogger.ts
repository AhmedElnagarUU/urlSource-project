import fs from 'fs';
import path from 'path';
import { LogEntry } from './types';

const LOGS_DIR = path.join(process.cwd(), 'logs');

// Ensure logs directory exists
function ensureLogsDir() {
  if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR, { recursive: true });
  }
}

// Get today's log file path
function getLogFilePath(): string {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  return path.join(LOGS_DIR, `${today}.log`);
}

// Format log entry for file
function formatLogEntry(entry: LogEntry): string {
  const parts = [
    `[${entry.timestamp}]`,
    `[${entry.level.toUpperCase()}]`,
    entry.message,
  ];

  if (entry.context) {
    parts.push(`Context: ${JSON.stringify(entry.context)}`);
  }

  if (entry.error) {
    parts.push(`Error: ${entry.error.name} - ${entry.error.message}`);
    if (entry.error.stack) {
      parts.push(`Stack: ${entry.error.stack}`);
    }
  }

  return parts.join(' ') + '\n';
}

// Write log to file asynchronously
export async function writeToFile(entry: LogEntry): Promise<void> {
  try {
    ensureLogsDir();
    const logFilePath = getLogFilePath();
    const logLine = formatLogEntry(entry);
    
    // Append to file asynchronously
    await fs.promises.appendFile(logFilePath, logLine, 'utf8');
  } catch (error) {
    // Silently fail to prevent logging errors from breaking the app
    console.error('Failed to write to log file:', error);
  }
}

// Clean old log files (older than 30 days)
export async function cleanOldLogs(): Promise<void> {
  try {
    ensureLogsDir();
    const files = await fs.promises.readdir(LOGS_DIR);
    const now = Date.now();
    const thirtyDaysAgo = now - (30 * 24 * 60 * 60 * 1000);

    for (const file of files) {
      if (file.endsWith('.log')) {
        const filePath = path.join(LOGS_DIR, file);
        const stats = await fs.promises.stat(filePath);
        
        if (stats.mtimeMs < thirtyDaysAgo) {
          await fs.promises.unlink(filePath);
        }
      }
    }
  } catch (error) {
    // Silently fail
    console.error('Failed to clean old logs:', error);
  }
}

