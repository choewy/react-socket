import { SocketClientStorage } from '@choewy/react-socket';

SocketClientStorage.create({ url: 'ws://localhost:4000' });

function App() {
  const socket = SocketClientStorage.get('default');

  if (socket) {
    socket.useOnEvent('connect', () => console.log('connect'));
    socket.useOnEvent('disconnect', () => console.log('disconnect'));
    socket.useOnEvent('connect_error', (e) => console.log('connect_error', e));
    socket.useOnEvent('error', () => console.log('error'));
    socket.useConnect();
  }

  return <div></div>;
}

export default App;
