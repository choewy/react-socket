import { useEffect } from 'react';
import { Manager, Socket } from 'socket.io-client';

import { createUrl } from './helpers';
import { SocketClientOptions, SocketEventHandler } from './interfaces';
import { SocketEvent } from './socket.event';

export class SocketClient extends Socket {
  private readonly name: string;

  constructor({ name, url, namespace, ...opts }: SocketClientOptions) {
    super(new Manager(createUrl(url, namespace), opts), '', opts);
    this.name = name ?? 'default';
  }

  useConnect() {
    useEffect(() => {
      this.connect();

      return () => {
        this.disconnect();
      };
    }, []);
  }

  useOnEvent<T>(event: string, handler: SocketEventHandler<T>) {
    useEffect(() => {
      this.on(event, (...payloads) => new SocketEvent(this.name, event, payloads).dispatch());
    }, []);

    useEffect(() => {
      const eventName = SocketEvent.createName(this.name, event);
      const eventHandler = async (e: Event) => {
        const ev = e as SocketEvent<T>;
        await handler(ev.detail);
      };

      window.addEventListener(eventName, eventHandler);

      return () => {
        window.removeEventListener(eventName, eventHandler);
      };
    }, []);
  }
}
