import axios from 'axios';
import { LogEntry } from './types';

interface ExternalLoggerConfig {
  endpoint: string;
  apiKey?: string;
  timeout?: number;
}

let config: ExternalLoggerConfig | null = null;

export function configureExternalLogger(endpoint: string, apiKey?: string, timeout: number = 5000) {
  config = { endpoint, apiKey, timeout };
}

export async function sendToExternal(entry: LogEntry): Promise<void> {
  if (!config) {
    return;
  }

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (config.apiKey) {
      headers['Authorization'] = `Bearer ${config.apiKey}`;
    }

    await axios.post(config.endpoint, entry, {
      headers,
      timeout: config.timeout,
    });
  } catch (error) {
    // Silently fail to prevent external logging errors from breaking the app
    // In production, you might want to queue failed logs for retry
    console.error('Failed to send log to external service:', error);
  }
}

