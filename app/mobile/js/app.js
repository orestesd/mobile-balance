(function() {

  $('#gameidsend').click(function() {
    var gameid = $('#gameid').val();
    emit('mobile-connection', {gameid:gameid});
  });

  $('#start').click(function() {
    emit('game-start');
  });


  $(document).bind('io-welcome', function() {
  });

  $(document).bind('io-connected', function() {
    $('#init, #game').hide();
    $('#wait').show();
  });

  $(document).bind('io-game-started', function() {
    console.log('game started');
    $('#init, #wait').hide();
    $('#game').show();

    initSensors();
  });

  function initSensors() {
    var count = 0;

    window.addEventListener('deviceorientation', function(eventData) {

      // call our orientation event handler every N times
      if (count++ > 1) {
        deviceOrientationHandler(eventData);
        count = 0;
      }
      
    }, false);
  }

  function deviceOrientationHandler(rotation) {
    
    function round(val) {
      var amt = 10;
      return Math.round(val * amt) /  amt;
    }

    // gamma is the left-to-right tilt in degrees, where right is positive
    // beta is the front-to-back tilt in degrees, where front is positive
    // alpha is the compass direction the device is facing in degrees
    var rot = {
      alpha: round(rotation.alpha),
      beta:  round(rotation.beta),
      gamma: round(rotation.gamma)
    };

    $('#game').html(rot.alpha + ',' + rot.beta + ',' + rot.gamma);
    
    emit('device-command', rot);
  }

  window.deviceOrientationHandler = deviceOrientationHandler;

  function emit() {
    window.wsemit.apply(window, arguments);
  }

})();

