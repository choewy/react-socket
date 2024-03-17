import { SocketClientStorage } from '@choewy/react-socket';
import { useState } from 'react';

SocketClientStorage.create({ url: 'ws://localhost:4000' });

function App() {
  const socket = SocketClientStorage.get('default');
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<unknown>({});

  if (socket) {
    socket.useOnEvent('connect', () => setConnected(true));
    socket.useOnEvent('disconnect', () => setConnected(false));
    socket.useOnEvent('connect_error', (e) => setError(e));
    socket.useOnEvent('error', (e) =>
      setError({
        name: e.name,
        message: e.message,
      }),
    );
    socket.useConnect();
  }

  return (
    <div>
      <h1>{connected ? 'connected' : 'disconnected'}</h1>
      <div>
        <h2>Error</h2>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
