(function(conf, global) {

  var socket = io.connect(conf.server);

  socket.on('welcome', function() {
    $(document).trigger('io-welcome');
  });

  socket.on('connected', function() {
    $(document).trigger('io-connected');
  });

  socket.on('game-started', function() {
    $(document).trigger('io-game-started');
  });

  
  global.wsemit = function(channel, data) {
    console.log(channel, data);
    socket.emit(channel, data);
  };

})( {server:window.location.origin}, window );

