export function sendJson(type: string, message: string, data?: any) {
  return JSON.stringify({
    type: type,
    data: data ?? {},
    message: message,
  });
}

