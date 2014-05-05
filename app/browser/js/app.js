(function() {


  $(document).bind('io-welcome', function() {
    var gameid = Math.random().toString(36).substring(2, 6);
    $('#gameid').html(gameid);

    emit('browser-connection', {gameid:gameid});
  });

  $(document).bind('io-client-connected', function() {
    $('#connected-clients span').html(parseInt($('#connected-clients span').html()) + 1);
    $('#connected-clients').show();
  });

  $(document).bind('io-game-started', function() {
    console.log('game started');
    $('#init').hide();
    $('#game').show();
  });

  $(document).bind('io-device-command', function(event, data) {
    console.log('device %s command', data.clientid, data.alpha, data.beta, data.gamma);
  });

  function emit() {
    $(document).trigger('io-emit', arguments);
  }

})();

