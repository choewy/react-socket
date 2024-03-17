export const createSocketEventName = (name: string, event: string) => {
  return ['socket_event', name, event].join('.');
};
