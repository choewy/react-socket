import { SocketClientStorage, SocketConnectionHandler, SocketEventHandler } from '@choewy/react-socket';
import './App.css';

import { useCallback, useState } from 'react';
import SendMessageForm from './SendMessageForm';

const socket = SocketClientStorage.create({ url: 'ws://localhost:4000' });

function App() {
  const [connected, setConnected] = useState<boolean>(false);
  const [messages, setMessages] = useState<string[]>([]);

  const onConnect: SocketConnectionHandler = useCallback(() => setConnected(true), []);
  const onMessage: SocketEventHandler<[string]> = useCallback((message: string) => setMessages((prev) => [message, ...prev]), []);

  socket.useOnEvent('connect', onConnect);
  socket.useOnEvent('message', onMessage);
  socket.useConnect();

  return (
    <div className="App">
      <h1>connected : {connected ? 'connected' : 'disconnected'}</h1>
      <h1>Messages</h1>
      <ul>
        {messages.map((message, i) => (
          <li key={['message', i].join('-')}>{message}</li>
        ))}
      </ul>
      <SendMessageForm />
    </div>
  );
}

export default App;
