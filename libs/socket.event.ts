export class SocketEvent<T> extends CustomEvent<T> {
  static createName(name: string, event: string) {
    return ['socket_event', name, event].join('.');
  }

  constructor(name: string, event: string, detail: T) {
    super(SocketEvent.createName(name, event), { detail });
  }

  dispatch(): void {
    window.dispatchEvent(this);
  }
}
