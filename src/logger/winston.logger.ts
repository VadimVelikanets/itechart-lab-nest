import { createLogger, format, transports } from 'winston';

const customFormat = format.printf(({ timestamp, level, stack, message }) => {
  return `${timestamp} - [${level.toUpperCase().padEnd(7)}] - ${
    stack || message
  }`;
});

const instanceLogger = {
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    customFormat,
  ),
  transports: [
    new transports.File({
      filename: 'logs/app.log',
    }),
  ],
};

export const instance = createLogger(instanceLogger);
