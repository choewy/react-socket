export class SocketEvent<T> extends CustomEvent<T> {
  static createEventName(name: string, event: string) {
    return ['socket_event', name, event].join('.');
  }

  constructor(eventName: string, detail: T) {
    super(eventName, { detail });
  }

  dispatch(): void {
    window.dispatchEvent(this);
  }
}
