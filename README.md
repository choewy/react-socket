# React Socket

## Installing

```bash
npm i @choewy/react-socket
```

## Uses

### `SocketClientStorage.create`

```tsx
import { SocketClientStorage } from '@choewy/react-socket';

/** @commant name(default : "default") */
SocketClientStorage.create({ url: 'ws://localhost:4000' });

/** @commant create socketClient with name */
SocketClientStorage.create({ name: 'choewy', url: 'ws://localhost:4000' });

/** @commant create socketClient with name and namespace */
SocketClientStorage.create({ name: 'choewy:alert', url: 'ws://localhost:4000', namespace: 'alert' });
```

### `SocketClientStorage.get`

```tsx
import { SocketClientStorage } from '@choewy/react-socket';

/** @commant name(default : "default") */
const defaultSocket = SocketClientStorage.get();

/** @commant name("choewy") */
const choewySocket = SocketClientStorage.get('choewy');

/** @commant name("choewy:alert") */
const choewyAlertSocket = SocketClientStorage.get('choewy:alert');
```

```tsx
import { ChangeEventHandler, FormEventHandler, useCallback, useState } from 'react';
import { SocketClientStorage } from '@choewy/react-socket';

function SendMessageForm() {
  const socket = SocketClientStorage.get();
  const [message, setMessage] = useState<string>('');

  const onChangeMessage: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setMessage(e.target.value);
  }, []);

  const onSendMessage: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();

      if (socket === null || message === '') {
        return;
      }

      socket.emit('message', message);
      setMessage('');
    },
    [socket, message],
  );

  return (
    <form onSubmit={onSendMessage}>
      <input value={message} onChange={onChangeMessage} />
      <button type="submit">Send Message</button>
    </form>
  );
}

export default SendMessageForm;
```

### `SocketClient.useConnect`

```tsx
const socket = SocketClientStorage.create({ url: 'ws://localhost:4000' });

function App() {
  socket.useConnect();
}

export default App;
```

### `SocketClient.useOnEvent`

```tsx
import { useCallback, useState } from 'react';
import { SocketClientStorage, SocketConnectionHandler, SocketEventHandler } from '@choewy/react-socket';

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
    </div>
  );
}

export default App;
```
