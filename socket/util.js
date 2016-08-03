const crypto = require('crypto');
const _ = require('underscore');

function ChatUtil() {

}

ChatUtil.prototype.randomHex = function () {
  return crypto.randomBytes(24).toString('hex');
};

ChatUtil.prototype.findRoomByRoomNumber = function (rooms, roomNumber) {
  return _.findWhere(rooms, {roomNumber});
};

ChatUtil.prototype.findRoomBySocketId = function (rooms, socketId) {
  var foundRoom;
  rooms.forEach(function (room) {
    const sockets = room.sockets;
    if (_.contains(sockets, socketId)) {
      foundRoom = room;
    }
  });
  return foundRoom;
};

module.exports = new ChatUtil();
