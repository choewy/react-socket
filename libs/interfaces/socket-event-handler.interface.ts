import { Socket } from 'socket.io-client';
import { DisconnectDescription } from 'socket.io-client/build/esm/socket';

export type SocketConnectionHandler = () => void | Promise<void>;
export type SocketConnectErrorHandler = (error: Error | DisconnectDescription) => void | Promise<void>;
export type SocketDisconnectHandler = (reason: Socket.DisconnectReason, description?: DisconnectDescription) => void | Promise<void>;
export type SocketErrorHandler = (error: Error) => void | Promise<void>;
export type SocketReconnectHandler = (attempt: number) => void | Promise<void>;
export type SocketReconnectAttemptHandler = (attempt: number) => void | Promise<void>;
export type SocketReconnectErrorHandler = (error: Error) => void | Promise<void>;
export type SocketReconnectFailedHandler = () => void | Promise<void>;
export type SocketEventHandler<T extends Array<any>> = (...args: T) => void | Promise<void>;
