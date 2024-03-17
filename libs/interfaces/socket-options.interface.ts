import { ManagerOptions, SocketOptions } from 'socket.io-client';

export interface SocketClientOptions extends Partial<ManagerOptions & SocketOptions> {
  name?: string;
  url: string;
  namespace?: string;
}
