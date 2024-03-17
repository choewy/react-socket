export type SocketAuth = { [key: string]: unknown } | ((cb: (data: object) => void) => void);
