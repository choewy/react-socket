export const createSocketEventName = (name: string, event: string) => {
  return ['socket_event', name, event].join('.');
};

export class SocketEvent<T> extends CustomEvent<T> {
  constructor(eventName: string, detail: T) {
    super(eventName, { detail });
  }
}
