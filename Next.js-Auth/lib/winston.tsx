import { createLogger, transports, format } from "winston";
import 'winston-daily-rotate-file';

const fileRotateTransport = new transports.DailyRotateFile({
  filename: './log/app-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
});

export const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  // transports: [new transports.Console()],
  // transports: [new transports.File({filename: './log/app.log',}),]
  transports: [fileRotateTransport],
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    }),
  ),
});


