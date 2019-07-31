/*
 * Copyright 2018 Dialog LLC <info@dlg.im>
 */

const envSchema = require('env-schema');

const env = envSchema({
  dotenv: true,
  schema: {
    type: 'object',
    required: ['BOT_TOKEN'],
    properties: {
      BOT_TOKEN: {
        type: 'string'
      },
      BOT_ENDPOINT: {
        type: 'string'
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
    level: 'trace'
  }
};

export default config;
