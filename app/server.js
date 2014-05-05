var connect = require('connect');

var httpport = process.env.PORT || 8000;

var app = connect()
    .use(connect.static('app'))
    .listen(httpport);
console.log('http listening on port %d', httpport);


var io = require('socket.io').listen(app);

var games = {};

io.sockets.on('connection', function (socket) {
  console.log('new client', socket.id);

  var game;

  // welcome the new client
  socket.emit('welcome');

  socket.on('browser-connection', function (data) {
    console.log('browser connected', data);
    
    var gameid = data.gameid;

    game = games[gameid] = {
      id: gameid,
      server: socket,
      clients: []
    };
  });

  socket.on('mobile-connection', function (data) {
    console.log('mobile connected', data);

    var gameid = data.gameid;
    game = games[gameid];

    if (game) {
      game.clients.push(socket);
      game.server.emit('client-connected');
      socket.emit('connected');
    } else {
      socket.emit('mobile-connection-error');
    }
  });

  socket.on('game-start', function() {
    game.server.emit('game-started');
    game.clients.forEach(function(client) {
      client.emit('game-started');
    });
  });

  socket.on('device-command', function(data) {
    data.clientid = socket.id;
    game.server.emit('device-command', data);
  });

});
