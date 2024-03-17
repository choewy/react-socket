import { useEffect } from 'react';
import { Socket, io } from 'socket.io-client';

import { createUrl } from './helpers';
import { SocketClientOptions, SocketEventHandler } from './interfaces';
import { SocketEvent } from './socket.event';

export class SocketClient {
  private readonly name: string;

  private _socket: Socket;

  constructor({ name, url, namespace, ...opts }: SocketClientOptions) {
    this._socket = io(createUrl(url, namespace), opts);
    this.name = name ?? 'default';
  }

  get socket() {
    return this._socket;
  }

  get connect() {
    return this._socket.connect;
  }

  get disconnect() {
    return this._socket.disconnect;
  }

  get emit() {
    return this._socket.emit;
  }

  get emitWithAck() {
    return this._socket.emitWithAck;
  }

  useOnEvent<T>(event: string, handler: SocketEventHandler<T>) {
    const eventName = SocketEvent.createEventName(this.name, event);

    useEffect(() => {
      this._socket.on(event, (...payloads) => new SocketEvent(eventName, payloads).dispatch());
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
