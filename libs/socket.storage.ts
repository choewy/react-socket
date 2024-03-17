import { SocketClientOptions } from './interfaces';
import { SocketClient } from './socket.client';

export class SocketClientStorage {
  private static readonly socketClientMap: Map<string, SocketClient> = new Map();

  static create({ name, ...opts }: SocketClientOptions) {
    const socketClient = new SocketClient({
      transports: ['websocket'],
      autoConnect: false,
      reconnection: true,
      ...opts,
    });

    this.socketClientMap.set(name ?? 'default', socketClient);

    return socketClient;
  }

  static get(name: string = 'default'): SocketClient {
    return this.socketClientMap.get(name);
  }
}
