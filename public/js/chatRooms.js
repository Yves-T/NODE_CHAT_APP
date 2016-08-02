(function () {
  document.addEventListener("DOMContentLoaded", function () {
    /* global io */
    var host = location.host;
    var socket = io.connect(host + '/roomlist');

    socket.on('connect', function () {
      console.log('connection established');
    });

    socket.on('roomupdate', function (data) {
      var procData = JSON.parse(data);

      var roomList = document.querySelector('.roomlist');
      roomList.innerHTML = '';
      procData.forEach(function (room) {
        var listItem =
          '<li class="list-group-item">' + room.roomName + '</li>';
        var newListElement = document.createElement('a');
        newListElement.setAttribute('href', 'room/' + room.roomNumber);
        newListElement.innerHTML = listItem;
        roomList.insertBefore(newListElement, roomList.firstChild);
      });
    });

    var addBtn = document.getElementById('create');
    addBtn.addEventListener('click', function () {
      var newsRoom = document.querySelector('.newRoom');
      var roomName = newsRoom.value;
      if (roomName !== '') {
        var roomNumber = parseInt(Math.random() * 10000, 10);
        socket.emit('newroom', {roomName: roomName, roomNumber: roomNumber});
        newsRoom.value = '';
      }
    });
  });
})();
