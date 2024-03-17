import { useEffect } from 'react';
import { Socket, io } from 'socket.io-client';

import { createUrl } from './helpers';
import {
  SocketClientOptions,
  SocketConnectErrorHandler,
  SocketConnectionHandler,
  SocketDisconnectHandler,
  SocketErrorHandler,
  SocketEventHandler,
  SocketReconnectAttemptHandler,
  SocketReconnectErrorHandler,
  SocketReconnectFailedHandler,
  SocketReconnectHandler,
} from './interfaces';
import { SocketEvent } from './socket.event';

export class SocketClient {
  private readonly name: string;
  private _socket: Socket;

  constructor({ name, url, namespace, ...opts }: SocketClientOptions) {
    this.name = name ?? 'default';
    this._socket = io(createUrl(url, namespace), opts);
  }

  useConnect() {
    useEffect(() => {
      if (this._socket.connected) {
        return;
      }

      this._socket = this._socket.connect();

      return () => {
        this._socket.disconnect();
      };
    }, []);
  }

  useOnEvent(event: 'connect', handler: SocketConnectionHandler): void;
  useOnEvent(event: 'connect_error', handler: SocketConnectErrorHandler): void;
  useOnEvent(event: 'disconnect', handler: SocketDisconnectHandler): void;
  useOnEvent(event: 'error', handler: SocketErrorHandler): void;
  useOnEvent(event: 'reconnect', handler: SocketReconnectHandler): void;
  useOnEvent(event: 'reconnect_attempt', handler: SocketReconnectAttemptHandler): void;
  useOnEvent(event: 'reconnect_error', handler: SocketReconnectErrorHandler): void;
  useOnEvent(event: 'reconnect_failed', handler: SocketReconnectFailedHandler): void;
  useOnEvent<T extends Array<unknown> = []>(event: string, handler: SocketEventHandler<T>): void;
  useOnEvent(event: string, handler: SocketEventHandler<any>) {
    const eventName = SocketEvent.createEventName(this.name, event);

    useEffect(() => {
      this._socket.on(event, (payloads) => new SocketEvent(eventName, payloads).dispatch());
    }, [event, eventName]);

    useEffect(() => {
      const eventHandler = async (e: Event) => {
        await handler(...(e as SocketEvent<[unknown]>).detail);
      };

      window.addEventListener(eventName, eventHandler);

      return () => {
        window.removeEventListener(eventName, eventHandler);
      };
    }, [eventName, handler]);
  }
}
