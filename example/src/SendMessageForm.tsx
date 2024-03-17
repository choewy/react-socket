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
