(function(conf) {

  var socket = io.connect(conf.server);

  socket.on('welcome', function() {
    $(document).trigger('io-welcome');
  });

  socket.on('client-connected', function() {
    $(document).trigger('io-client-connected');
  });

  socket.on('game-started', function() {
    $(document).trigger('io-game-started');
  });

  socket.on('device-rotated', function(data) {
    $(document).trigger('io-device-rotated', data);
  });

  $(document).bind('io-emit', function(evt, channel, data) {
    socket.emit(channel, data);
  });

})( {server:window.location.origin} );

