document.addEventListener("DOMContentLoaded", function () {
  /* global messages, roomNum, userPic, userName */
  messages.on('connect', function () {
    messages.emit('joinroom', {room: roomNum, user: userName, userPic: userPic});
  });

  messages.on('messagefeed', function (data) {
    var messages = JSON.parse(data);
    updateMessageFeed(messages.userPic, messages.message);
  });

  var inputField = document.querySelector('.newmessage');
  inputField.addEventListener('keyup', function (event) {
    if (event.which === 13 && inputField.value !== '') {
      messages.emit('newMessage', {
        roomNumber: roomNum,
        user: userName,
        userPic: userPic,
        message: inputField.value
      });
      updateMessageFeed(userPic, inputField.value);
      inputField.value = '';
    }
  });

  function updateMessageFeed(userPic, message) {
    var template = '          <div class="media">';
    template += '<div class="media-left">';
    template += '<img src="' + userPic + '" alt="User profile picture">';
    template += '</div>';
    template += '<div class="media-body">';
    template += '<h4 class="media-heading"><p>' + message + '</p></h4>';
    template += '</div>';
    template += '</div>';

    var newListElement = document.createElement('li');
    newListElement.setAttribute('class', 'list-group-item');
    newListElement.innerHTML = template;
    var chatRoomMessages = document.querySelector('.messages');
    chatRoomMessages.insertBefore(newListElement, chatRoomMessages.firstChild);
  }

  messages.on('updateUserList', function (data) {
    var userList = JSON.parse(data);
    var userElement = document.querySelector('.users');
    userElement.innerHTML = '';
    userList.forEach(function (user) {
      var template = '<img src="' + user.userPic + '"<h5>&nbsp;' + user.user + '</h5>';
      var newListElement = document.createElement('li');
      newListElement.setAttribute('class', 'list-group-item');
      newListElement.innerHTML = template;
      userElement.insertBefore(newListElement, userElement.firstChild);
    });
  });

  setInterval(function () {
    messages.emit('updateList', {room: roomNum});
  }, 15 * 1000);
});
