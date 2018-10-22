/*
 * Copyright 2018 Dialog LLC <info@dlg.im>
 */

const defaultEndpoints = [
  'https://grpc-test.transmit.im:9443'
];

function parseToken() {
  const token = process.env.BOT_TOKEN;
  if (!token) {
    throw new Error('BOT_TOKEN env required');
  }

  return token;
}

function parseEndpoints() {
  const raw = (process.env.BOT_ENDPOINT || process.env.BOT_ENDPOINTS) || '';
  const endpoints = raw.split(' ').map((url) => url.trim()).filter((url) => url.length);

  if (endpoints.length) {
    return endpoints;
  }

  console.warn(`Using default endpoints: ${defaultEndpoints.join(', ')}`);

  return defaultEndpoints;
}

const config = {
  token: parseToken(),
  endpoints: parseEndpoints()
};

export default config;
