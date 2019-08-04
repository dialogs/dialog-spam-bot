/*
 * Copyright 2018 Dialog LLC <info@dlg.im>
 */

const envSchema = require('env-schema');

const env = envSchema({
  dotenv: true,
  schema: {
    type: 'object',
    required: ['BOT_TOKEN', 'BOT_ENDPOINT'],
    properties: {
      BOT_TOKEN: {
        type: 'string'
      },
      BOT_ENDPOINT: {
        type: 'string'
      },
      LOG_LEVEL: {
        type: 'string',
        default: 'info'
      }
    }
  }
});

type Config = {
  token: string;
  endpoints: Array<string>;
  loggerOptions: Object;
};

const config: Config = {
  token: env.BOT_TOKEN,
  endpoints: [env.BOT_ENDPOINT],
  loggerOptions: {
    level: env.LOG_LEVEL
  }
};

export default config;
