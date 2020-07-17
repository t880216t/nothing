import io from 'socket.io-client';

let socket = '';

export function initSocket(action) {
  const urlHost = window.location.host;
  if (socket && socket.connected) {
    return
  }
  socket = io(`ws://${urlHost}/ws`);
  socket.on('connect', () => {
    console.log('<= 连接服务器成功！');
  });
  socket.on('disconnect', () => {
    console.log('=> 断开服务器成功！');
  });
  socket.on('server_response', (data) => {
    const jsonData = JSON.parse(data)
    action({
      type: 'server_response',
       ...jsonData,
    });
  });
}

export function querySendMessage(payload) {
  socket.emit('send_message', payload);
}

export function queryAddUser(payload) {
  return new Promise((resolve) => {
    socket.emit('add_user', payload, resolve);
  });
}
