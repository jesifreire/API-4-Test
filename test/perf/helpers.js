// Helpers para os scripts k6
export function randomString(len = 8) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let s = '';
  for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

export function randomEmail() {
  return `${randomString(6)}@example.com`;
}

export function buildLoginPayload(username, password) {
  return JSON.stringify({ username, password });
}
