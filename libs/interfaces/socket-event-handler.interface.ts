export type SocketEventHandler<T = any> = (payload: T) => void | Promise<void>;
