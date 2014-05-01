(function() {

  // Matter.js - http://brm.io/matter-js/

  // Matter module aliases
  var Engine = Matter.Engine,
      World = Matter.World,
      Body = Matter.Body,
      Bodies = Matter.Bodies,
      Constraint = Matter.Constraint,
      Composites = Matter.Composites,
      MouseConstraint = Matter.MouseConstraint;

  // create a Matter.js engine
  var engine = Engine.create(document.getElementById('canvas'), {
    render: {
      options: {
        showAngleIndicator: false,
        showVelocity: false,
        showCollisions: false,
        wireframes: false
      }
    }
  });

  // create the palette
  var palette = Bodies.rectangle(500, 520, 450, 20, { isStatic: true });

  // add bodies to the world
  World.add(engine.world, palette);
   
  function start() {
      // run the engine
      Engine.run(engine);

      var interval = setInterval(function() {
        var x = 500 + Math.floor(Math.random() * 200) - 200;
        var y = 100;
        var body;

        if (Math.random() < 0.5) {
          var radius = Math.floor(Math.random() * 10) + 30; 
          body = Bodies.circle(x, y, radius);
        } else {
          var width = Math.floor(Math.random() * 5) + 40;
          var height = Math.floor(Math.random() * 10) + 80;
          body = Bodies.rectangle(x, y, width, height);
        }

        World.add(engine.world, body);
      }, 3000);
  }

  $(document).bind('io-game-started', function() {
    start();
  });

  $(document).bind('io-device-rotated', function(event, data) {
    var rotation = data.beta * Math.PI / 180;
    var radians = rotation - palette.angle;
    Body.rotate(palette, radians);
  });
  
})();
