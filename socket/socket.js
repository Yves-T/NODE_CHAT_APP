const Util = require('./util');

module.exports = (io, rooms) => {
  const chatrooms = io.of('/roomlist').on('connection', socket => {
    socket.emit('roomupdate', JSON.stringify(rooms));

    socket.on('newroom', data => {
      data.roomNumber = Util.randomHex();
      data.sockets = [];
      rooms.push(data);
      socket.broadcast.emit('roomupdate', JSON.stringify(rooms));
      socket.emit('roomupdate', JSON.stringify(rooms));
    });
  });

  const messages = io.of('/messages').on('connection', socket => {
    socket.on('joinroom', data => {
      const room = Util.findRoomByRoomNumber(rooms, data.room);
      room.sockets.push(socket.id);
      socket.username = data.user;
      socket.userPic = data.userPic;
      socket.join(data.room);
      updateUserList(data.room, true);
    });

    socket.on('newMessage', data => {
      socket.broadcast.to(data.roomNumber).emit('messagefeed', JSON.stringify(data));
    });

    function updateUserList(room, updateAll) {
      const userlist = [];
      const chatRoomSockets = io.of('/messages').sockets;

      for (prop in chatRoomSockets) {
        if (chatRoomSockets.hasOwnProperty(prop)) {
          userlist.push({
            user: chatRoomSockets[prop].username,
            userPic: chatRoomSockets[prop].userPic
          });
        }
      }

      socket.emit('updateUserList', JSON.stringify(userlist));

      if (updateAll) {
        socket.broadcast.emit('updateUserList', JSON.stringify(userlist));
      }
    }

    socket.on('updateList', data => {
      updateUserList(data.room);
    });

    socket.on('disconnect', () => {
      var room = Util.findRoomBySocketId(rooms, socket.id);
      if (room) {
        socket.leave(room.roomNumber);
        updateUserList(room.roomNumber);
      }
    });
  });
};
