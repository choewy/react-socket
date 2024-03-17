import { useEffect } from 'react';
import { Socket, io } from 'socket.io-client';

import { createUrl } from './helpers';
import { SocketClientOptions, SocketEventHandler } from './interfaces';
import { SocketEvent } from './socket.event';

export class SocketClient {
  private readonly name: string;

  private socket: Socket;

  constructor({ name, url, namespace, ...opts }: SocketClientOptions) {
    this.socket = io(createUrl(url, namespace), opts);
    this.name = name ?? 'default';
  }

  useOnEvent<T>(event: string, handler: SocketEventHandler<T>) {
    const eventName = SocketEvent.createEventName(this.name, event);

    useEffect(() => {
      this.socket.on(event, (...payloads) => new SocketEvent(eventName, payloads).dispatch());
    }, [eventName]);

    useEffect(() => {
      const eventHandler = async (e: Event) => {
        const ev = e as SocketEvent<T>;
        await handler(ev.detail);
      };

      window.addEventListener(eventName, eventHandler);

      return () => {
        window.removeEventListener(eventName, eventHandler);
      };
    }, [eventName, handler]);
  }
}
