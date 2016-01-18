export default class Play {
  preload() {
    this.game.load.audio('cantina-song', 'assets/songs/cantina-song.ogg');
    this.game.load.image(this.config.xWing.name, this.config.xWing.path);
    this.game.load.image('tinystar', 'assets/sprites/star2.png');

    //Dynamically preload images
    for(let i=0; i < this.config.ship.number; i++){
      this.game.load.image(`ship-${i}`, `assets/sprites/${i}.png`);
    }
  }

  init(){
    this.config = {
        xWing: {
          name: 'x-wing',
          path: 'assets/sprites/x-wing.png',
          width: 222,
          height: 250
        },
        star:{
          distance: 10,
          max: 100,
          speed: 10
        },
        ship:{
          scaleRatio: 0.5,
          spawnRate: 0.01,
          number: 45
        }
    };
    
    this.stars = [];
    this.points = [];
    this.alive = true;
    this.score = 0;
  }

  create() {
    // Start audio
    this.sfx = this.game.add.audio('cantina-song');
    this.sfx.play();

    // Create textures
    this.starsTexture = this.game.add.renderTexture(this.game.world.width, this.game.world.height, 'texture');
    this.starTexture = this.game.make.sprite(0, 0, 'tinystar');
    this.game.add.sprite(0, 0, this.starsTexture);

    // Create player ship
    this.playerShip = this.game.add.sprite(this.game.world.centerX - this.config.xWing.width / 4, this.game.world.height - 200, 'x-wing');
    this.playerShip.scale.setTo(this.config.ship.scaleRatio, this.config.ship.scaleRatio);
    this.game.physics.enable(this.playerShip, Phaser.Physics.ARCADE);
    this.playerShip.body.setSize(this.config.xWing.width, this.config.xWing.height);

    // Create obstacles group
    this.obstacles = this.game.add.group();
    this.obstacles.enableBody = true;
    this.obstacles.physicsBodyType = Phaser.Physics.ARCADE;

    this.generateNewEnemies();
    this.generatePoints();
    
    this.cursors = this.game.input.keyboard.createCursorKeys();

    //Add info and score texts
    this.game.add.text(16, 16, 'Arrows to move', { font: '14px Arial', fill: '#ffffff' });
    this.scoreText = this.game.add.text(this.game.world.centerX - this.score.toString().length * 20, 16, '', { font: '14px Arial', fill: '#ffffff' });

    this.game.time.events.repeat(Phaser.Timer.SECOND, 100, this.generateNewEnemies, this);
  }

  update() {
    if(this.alive){
      this.redrawStars();

      // Check collisions
      this.game.physics.arcade.collide(this.playerShip, this.obstacles, this.collisionHandler, null, this);
      this.playerShip.body.collideWorldBounds = true;
      this.playerShip.body.velocity.set(0);

      // Move playerShip
      switch(true){
        case this.cursors.left.isDown:
          this.playerShip.body.velocity.x = -1000;
          break;
        case this.cursors.right.isDown:
          this.playerShip.body.velocity.x = 1000;
          break;
        case this.cursors.up.isDown:
          this.playerShip.body.velocity.y = -1000;
          break;
        case this.cursors.down.isDown:
          this.playerShip.body.velocity.y = 1000;
          break;
      }

      // Update score text
      this.score += Math.round((this.game.world.height - this.playerShip.y) / 200);
      this.scoreText.text = `Score : ${this.score}`;
    }
  }

  collisionHandler(){
    this.alive = false;
    this.game.state.start('game-over', true, false, this.score);
  }

  generateNewEnemies() {
    for(let i=0; i < this.config.ship.number; i++){
      if(Math.random() < this.config.ship.spawnRate){
        //Create enemy in obsacle group at a random position above the screen and define physics
        let enemy = this.game.add.sprite(Math.floor(Math.random() * this.game.world.width), -Math.floor(Math.random() * this.game.world.height), `ship-${i}`);
        enemy.scale.setTo(this.config.ship.scaleRatio, this.config.ship.scaleRatio);
        this.game.physics.enable(enemy, Phaser.Physics.ARCADE);
        enemy.body.velocity.y = 700;
        this.obstacles.add(enemy);
        this.config.ship.spawnRate += 0.001;
      }
    }
  }

  generatePoints(){
    for (let i = 0; i < this.config.star.max; i++) {
      this.points.push({
        x: Math.floor(Math.random() * this.game.world.width),
        y: Math.floor(Math.random() * this.game.world.height)
      });
    }
  }

  drawStars(){
    this.points.forEach(function(point){
      point.y += this.config.star.distance;
      if (point.y > this.game.world.height) point.y = 0;
      this.starsTexture.renderXY(this.starTexture, point.x, point.y);
    }.bind(this));
  }

  redrawStars(){
    this.starsTexture.clear();
    this.drawStars();
  }

  shutdown(){
    this.sfx.destroy()
  }
}