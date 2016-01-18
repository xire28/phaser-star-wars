(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Boot = (function () {
	function Boot() {
		_classCallCheck(this, Boot);
	}

	_createClass(Boot, [{
		key: 'preload',
		value: function preload() {}
	}, {
		key: 'create',
		value: function create() {
			this.game.state.start('preload');
		}
	}]);

	return Boot;
})();

exports['default'] = Boot;
module.exports = exports['default'];

},{}],2:[function(require,module,exports){
// Create game (100% width, 100% height)
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

//Import states

var _Boot = require('./Boot');

var _Boot2 = _interopRequireDefault(_Boot);

var _Preload = require('./Preload');

var _Preload2 = _interopRequireDefault(_Preload);

var _Intro = require('./Intro');

var _Intro2 = _interopRequireDefault(_Intro);

var _Play = require('./Play');

var _Play2 = _interopRequireDefault(_Play);

var _GameOver = require('./GameOver');

var _GameOver2 = _interopRequireDefault(_GameOver);

//Register states
var game = new Phaser.Game('100', '100', Phaser.AUTO);game.state.add('boot', _Boot2['default']);
game.state.add('preload', _Preload2['default']);
game.state.add('intro', _Intro2['default']);
game.state.add('play', _Play2['default']);
game.state.add('game-over', _GameOver2['default']);

// Start game
game.state.start('boot');

},{"./Boot":1,"./GameOver":3,"./Intro":4,"./Play":5,"./Preload":6}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var GameOver = (function () {
  function GameOver() {
    _classCallCheck(this, GameOver);
  }

  _createClass(GameOver, [{
    key: 'preload',
    value: function preload() {
      this.game.load.audio('imperial-march', 'assets/songs/imperial-march.ogg');
      this.game.load.image('blood', 'assets/sprites/blood.png');
    }
  }, {
    key: 'init',
    value: function init(score) {
      this.score = score;
    }
  }, {
    key: 'create',
    value: function create() {
      this.sfx = this.game.add.audio('imperial-march');
      this.sfx.play();

      this.backgroundTexture = this.game.add.renderTexture(this.game.world.width, this.game.world.height, 'texture');
      this.bloodTexture = this.game.make.sprite(0, 0, 'blood');
      this.bloodTexture.anchor.setTo(0.5, 0.5);
      this.backgroundTexture.renderXY(this.bloodTexture, this.game.world.centerX, this.game.world.centerY);
      this.game.add.sprite(0, 0, this.backgroundTexture);

      //Render texts
      this.game.add.text(this.game.world.centerX - 140, this.game.world.centerY - 40, 'WASTED', { font: '62px Arial', fill: '#ffffff' });
      this.game.add.text(this.game.world.centerX - 50, this.game.world.centerY + 40, this.score + ' points', { font: '16px Arial', fill: '#ffffff' });
      this.game.add.text(this.game.world.centerX - 90, this.game.world.centerY + 80, '[ press a key to restart ]', { font: '16px Arial', fill: '#ffffff' });
      this.game.input.keyboard.onDownCallback = this.enterPlay.bind(this);
    }
  }, {
    key: 'enterPlay',
    value: function enterPlay() {
      this.game.state.start('play');
    }
  }, {
    key: 'shutdown',
    value: function shutdown() {
      this.game.input.keyboard.onDownCallback = null;
      this.sfx.destroy();
    }
  }]);

  return GameOver;
})();

exports['default'] = GameOver;
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Intro = (function () {
	function Intro() {
		_classCallCheck(this, Intro);
	}

	_createClass(Intro, [{
		key: 'preload',
		value: function preload() {
			this.game.load.image('tinystar', 'assets/sprites/star2.png');
			this.game.load.audio('main-title', 'assets/songs/main-title.ogg');
			this.game.load.bitmapFont('gem', 'assets/fonts/bitmapFonts/gem.png', 'assets/fonts/bitmapFonts/gem.xml');
		}
	}, {
		key: 'init',
		value: function init() {
			this.config = {
				font: {
					name: 'gem',
					size: 22,
					width: 5.5
				},
				star: {
					distance: 300,
					max: 100,
					speed: 10
				},
				intro: {
					content: "La République Galactique est en pleine ébullition. La taxation des routes commerciales reliant les systèmes éloignés provoque la discorde.\n" + "\n" + "Pour régler la question, la cupide Fédération du Commerce et ses redoutables vaisseaux de guerre imposent un blocus à la petite planète Naboo.\n" + "\n" + "le Chancelier Suprême charge en secret deux Chevaliers Jedi, gardiens de la paix et de la justice dans la galaxie, de résoudre le conflit...",
					durationPerLine: 200
				},
				'continue': {
					content: '[ Press a key to continue ]',
					delay: 6000,
					duration: 2000
				}
			};

			this.sentences = this.config.intro.content.split("\n");
			this.stars = [];
			this.points = [];
			this.currentSentenceIndex = 0;
			this.warpMode = false;
		}
	}, {
		key: 'create',
		value: function create() {
			this.game.stage.backgroundColor = 0x272822;

			//Create textures
			this.starsTexture = this.game.add.renderTexture(this.game.world.width, this.game.world.height, 'texture');
			this.starTexture = this.game.make.sprite(0, 0, 'tinystar');

			// Start sound
			this.sfx = this.game.add.audio('main-title');
			this.sfx.play();

			// Generate points for star locations
			this.generatePoints();

			// Add sprites and texts
			this.game.add.sprite(0, 0, this.starsTexture);

			this.introText = this.game.add.bitmapText(this.game.world.width / 2 - this.config.font.width * this.sentences[0].length, this.game.world.height / 2 - this.config.font.size * this.sentences.length, this.config.font.name, '', this.config.font.size);
			this.startText = this.game.add.bitmapText(this.game.world.width / 2 - this.config.font.width * this.config['continue'].content.length, this.game.world.height / 2 + this.config.font.size * this.sentences.length, this.config.font.name, this.config['continue'].content, this.config.font.size);

			// Blinking text
			this.startText.alpha = 0;
			this.game.add.tween(this.startText).to({ alpha: 1 }, this.config['continue'].duration, Phaser.Easing.Quadratic.InOut, true, this.config['continue'].delay);

			// Display intro text, one line at a time
			this.game.time.events.repeat(Phaser.Timer.SECOND, this.config.intro.durationPerLine, this.addNextSentence, this);

			// Wrap mode for stars
			this.game.time.events.add(this.config['continue'].delay, this.enableWarpMode, this);

			// Register key listeners
			this.game.input.keyboard.onDownCallback = this.enterPlay.bind(this);
			this.game.input.onDown.add(this.toggleFullscreen, this);
		}
	}, {
		key: 'toggleFullscreen',
		value: function toggleFullscreen() {
			this.game.scale.isFullScreen ? this.game.scale.stopFullScreen() : this.game.scale.startFullScreen(false);
		}
	}, {
		key: 'enableWarpMode',
		value: function enableWarpMode() {
			this.warpMode = true;
			this.game.time.events.repeat(Phaser.Timer.SECOND, 20, (function () {
				this.generatePoints();
			}).bind(this), this);
		}
	}, {
		key: 'enterPlay',
		value: function enterPlay() {
			this.game.state.start('play');
		}
	}, {
		key: 'addNextSentence',
		value: function addNextSentence() {
			if (this.currentSentenceIndex < this.sentences.length) this.introText.text += this.sentences[this.currentSentenceIndex++] + "\n";
		}
	}, {
		key: 'generatePoints',
		value: function generatePoints() {
			for (var i = 0; i < this.config.star.max; i++) {
				this.points.push({
					x: Math.floor(Math.random() * this.game.world.width) - this.game.world.width / 2,
					y: Math.floor(Math.random() * this.game.world.height) - this.game.world.height / 2,
					z: Math.floor(Math.random() * 1700) - 100
				});
			}
		}
	}, {
		key: 'drawStars',
		value: function drawStars() {
			var starDistance = this.config.star.distance;
			this.points.forEach((function (point) {
				var perspective = starDistance / (starDistance - point.z),
				    x = this.game.world.centerX + point.x * perspective,
				    y = this.game.world.centerY + point.y * perspective;

				point.z += this.config.star.speed;

				if (point.z > 200) point.z -= 600;
				this.starsTexture.renderXY(this.starTexture, x, y);
			}).bind(this));
		}
	}, {
		key: 'redrawStars',
		value: function redrawStars() {
			this.starsTexture.clear();
			this.drawStars();
		}
	}, {
		key: 'update',
		value: function update() {
			this.warpMode ? this.drawStars() : this.redrawStars();
		}
	}, {
		key: 'shutdown',
		value: function shutdown() {
			this.game.input.keyboard.onDownCallback = null;
			this.sfx.destroy();
		}
	}]);

	return Intro;
})();

exports['default'] = Intro;
module.exports = exports['default'];

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Play = (function () {
  function Play() {
    _classCallCheck(this, Play);
  }

  _createClass(Play, [{
    key: 'preload',
    value: function preload() {
      this.game.load.audio('cantina-song', 'assets/songs/cantina-song.ogg');
      this.game.load.image(this.config.xWing.name, this.config.xWing.path);
      this.game.load.image('tinystar', 'assets/sprites/star2.png');

      //Dynamically preload images
      for (var i = 0; i < this.config.ship.number; i++) {
        this.game.load.image('ship-' + i, 'assets/sprites/' + i + '.png');
      }
    }
  }, {
    key: 'init',
    value: function init() {
      this.config = {
        xWing: {
          name: 'x-wing',
          path: 'assets/sprites/x-wing.png',
          width: 222,
          height: 250
        },
        star: {
          distance: 10,
          max: 100,
          speed: 10
        },
        ship: {
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
  }, {
    key: 'create',
    value: function create() {
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
  }, {
    key: 'update',
    value: function update() {
      if (this.alive) {
        this.redrawStars();

        // Check collisions
        this.game.physics.arcade.collide(this.playerShip, this.obstacles, this.collisionHandler, null, this);
        this.playerShip.body.collideWorldBounds = true;
        this.playerShip.body.velocity.set(0);

        // Move playerShip
        switch (true) {
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
        this.scoreText.text = 'Score : ' + this.score;
      }
    }
  }, {
    key: 'collisionHandler',
    value: function collisionHandler() {
      this.alive = false;
      this.game.state.start('game-over', true, false, this.score);
    }
  }, {
    key: 'generateNewEnemies',
    value: function generateNewEnemies() {
      for (var i = 0; i < this.config.ship.number; i++) {
        if (Math.random() < this.config.ship.spawnRate) {
          //Create enemy in obsacle group at a random position above the screen and define physics
          var enemy = this.game.add.sprite(Math.floor(Math.random() * this.game.world.width), -Math.floor(Math.random() * this.game.world.height), 'ship-' + i);
          enemy.scale.setTo(this.config.ship.scaleRatio, this.config.ship.scaleRatio);
          this.game.physics.enable(enemy, Phaser.Physics.ARCADE);
          enemy.body.velocity.y = 700;
          this.obstacles.add(enemy);
          this.config.ship.spawnRate += 0.001;
        }
      }
    }
  }, {
    key: 'generatePoints',
    value: function generatePoints() {
      for (var i = 0; i < this.config.star.max; i++) {
        this.points.push({
          x: Math.floor(Math.random() * this.game.world.width),
          y: Math.floor(Math.random() * this.game.world.height)
        });
      }
    }
  }, {
    key: 'drawStars',
    value: function drawStars() {
      this.points.forEach((function (point) {
        point.y += this.config.star.distance;
        if (point.y > this.game.world.height) point.y = 0;
        this.starsTexture.renderXY(this.starTexture, point.x, point.y);
      }).bind(this));
    }
  }, {
    key: 'redrawStars',
    value: function redrawStars() {
      this.starsTexture.clear();
      this.drawStars();
    }
  }, {
    key: 'shutdown',
    value: function shutdown() {
      this.sfx.destroy();
    }
  }]);

  return Play;
})();

exports['default'] = Play;
module.exports = exports['default'];

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Preload = (function () {
	function Preload() {
		_classCallCheck(this, Preload);
	}

	_createClass(Preload, [{
		key: 'preload',
		value: function preload() {}
	}, {
		key: 'create',
		value: function create() {
			this.game.state.start('intro');
		}
	}]);

	return Preload;
})();

exports['default'] = Preload;
module.exports = exports['default'];

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDOi9Vc2Vycy9hbGV4YW5kcmUucGFnbGlhcm9AY3Budi5jaC9Eb2N1bWVudHMvR2l0SHViL3BoYXNlci1zdGFyLXdhcnMvc3JjL0Jvb3QuanMiLCJDOi9Vc2Vycy9hbGV4YW5kcmUucGFnbGlhcm9AY3Budi5jaC9Eb2N1bWVudHMvR2l0SHViL3BoYXNlci1zdGFyLXdhcnMvc3JjL0dhbWUuanMiLCJDOi9Vc2Vycy9hbGV4YW5kcmUucGFnbGlhcm9AY3Budi5jaC9Eb2N1bWVudHMvR2l0SHViL3BoYXNlci1zdGFyLXdhcnMvc3JjL0dhbWVPdmVyLmpzIiwiQzovVXNlcnMvYWxleGFuZHJlLnBhZ2xpYXJvQGNwbnYuY2gvRG9jdW1lbnRzL0dpdEh1Yi9waGFzZXItc3Rhci13YXJzL3NyYy9JbnRyby5qcyIsIkM6L1VzZXJzL2FsZXhhbmRyZS5wYWdsaWFyb0BjcG52LmNoL0RvY3VtZW50cy9HaXRIdWIvcGhhc2VyLXN0YXItd2Fycy9zcmMvUGxheS5qcyIsIkM6L1VzZXJzL2FsZXhhbmRyZS5wYWdsaWFyb0BjcG52LmNoL0RvY3VtZW50cy9HaXRIdWIvcGhhc2VyLXN0YXItd2Fycy9zcmMvUHJlbG9hZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7SUNBcUIsSUFBSTtVQUFKLElBQUk7d0JBQUosSUFBSTs7O2NBQUosSUFBSTs7U0FDakIsbUJBQUcsRUFFVDs7O1NBRUssa0JBQUc7QUFDUixPQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7R0FDakM7OztRQVBtQixJQUFJOzs7cUJBQUosSUFBSTs7Ozs7Ozs7Ozs7b0JDSVIsUUFBUTs7Ozt1QkFDTCxXQUFXOzs7O3FCQUNiLFNBQVM7Ozs7b0JBQ1YsUUFBUTs7Ozt3QkFDSixZQUFZOzs7OztBQVBqQyxJQUFJLElB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QyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQzs7O0FBRzNELE9BQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQzdDLE9BQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7OztBQUdoQixPQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7OztBQUd0QixPQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7O0FBRTlDLE9BQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFDN0UsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQzFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFDckIsRUFBRSxFQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FDckIsQ0FBQztBQUNGLE9BQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxZQUFTLENBQUMs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QUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztBQUMxRyxVQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQzNELFVBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzs7O0FBRzlDLFVBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDdEksVUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN0RixVQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2pFLFVBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7OztBQUdoRixVQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ3ZDLFVBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztBQUNqQyxVQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQzs7QUFFdkQsVUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7QUFDMUIsVUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDOztBQUV0QixVQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDOzs7QUFHM0QsVUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO0FBQ3RGLFVBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7O0FBRWxKLFVBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUN2Rjs7O1dBRUssa0JBQUc7QUFDUCxVQUFHLElBQUksQ0FBQyxLQUFLLEVBQUM7QUFDWixZQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7OztBQUduQixZQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3JHLFlBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztBQUMvQyxZQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7QUFHckMsZ0JBQU8sSUFBSTtBQUNULGVBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTTtBQUMzQixnQkFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztBQUN4QyxrQkFBTTtBQUFBLEFBQ1IsZUFBSyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNO0FBQzVCLGdCQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztBQUN2QyxrQkFBTTtBQUFBLEFBQ1IsZUFBSyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxNQUFNO0FBQ3pCLGdCQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO0FBQ3hDLGtCQUFNO0FBQUEsQUFDUixlQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU07QUFDM0IsZ0JBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQ3ZDLGtCQUFNO0FBQUEsU0FDVDs7O0FBR0QsWUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFBLEdBQUksR0FBRyxDQUFDLENBQUM7QUFDN0UsWUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLGdCQUFjLElBQUksQ0FBQyxLQUFLLEFBQUUsQ0FBQztPQUMvQztLQUNGOzs7V0FFZSw0QkFBRTtBQUNoQixVQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUNuQixVQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzdEOzs7V0FFaUIsOEJBQUc7QUFDbkIsV0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztBQUM1QyxZQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUM7O0FBRTVDLGNBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFVLENBQUMsQ0FBRyxDQUFDO0FBQ3RKLGVBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM1RSxjQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDdkQsZUFBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUM1QixjQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMxQixjQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksS0FBSyxDQUFDO1NBQ3JDO09BQ0Y7S0FDRjs7O1dBRWEsMEJBQUU7QUFDZCxXQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzdDLFlBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ2YsV0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztBQUNwRCxXQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1NBQ3RELENBQUMsQ0FBQztPQUNKO0tBQ0Y7OztXQUVRLHFCQUFFO0FBQ1QsVUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQSxVQUFTLEtBQUssRUFBQztBQUNqQyxhQUFLLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztBQUNyQyxZQUFJLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2xELFlBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7T0FDaEUsQ0FBQSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0tBQ2Y7OztXQUVVLHVCQUFFO0FBQ1gsVUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUMxQixVQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7S0FDbEI7OztXQUVPLG9CQUFFO0FBQ1IsVUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtLQUNuQjs7O1NBakprQixJQUFJOzs7cUJBQUosSUFBSTs7Ozs7Ozs7Ozs7Ozs7SUNBSixPQUFPO1VBQVAsT0FBTzt3QkFBUCxPQUFPOzs7Y0FBUCxPQUFPOztTQUNwQixtQkFBRyxFQUVUOzs7U0FFSyxrQkFBRztBQUNSLE9BQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztHQUMvQjs7O1FBUG1CLE9BQU87OztxQkFBUCxPQUFPIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvb3Qge1xuXHRwcmVsb2FkKCkge1xuXG5cdH1cblxuXHRjcmVhdGUoKSB7XG5cdFx0dGhpcy5nYW1lLnN0YXRlLnN0YXJ0KCdwcmVsb2FkJyk7XG5cdH1cbn0iLCIvLyBDcmVhdGUgZ2FtZSAoMTAwJSB3aWR0aCwgMTAwJSBoZWlnaHQpXG5sZXQgZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZSgnMTAwJywgJzEwMCcsIFBoYXNlci5BVVRPKTtcblxuLy9JbXBvcnQgc3RhdGVzXG5pbXBvcnQgQm9vdCBmcm9tICcuL0Jvb3QnXG5pbXBvcnQgUHJlbG9hZCBmcm9tICcuL1ByZWxvYWQnXG5pbXBvcnQgSW50cm8gZnJvbSAnLi9JbnRybydcbmltcG9ydCBQbGF5IGZyb20gJy4vUGxheSdcbmltcG9ydCBHYW1lT3ZlciBmcm9tICcuL0dhbWVPdmVyJ1xuXG4vL1JlZ2lzdGVyIHN0YXRlc1xuZ2FtZS5zdGF0ZS5hZGQoJ2Jvb3QnLCBCb290KTtcbmdhbWUuc3RhdGUuYWRkKCdwcmVsb2FkJywgUHJlbG9hZCk7XG5nYW1lLnN0YXRlLmFkZCgnaW50cm8nLCBJbnRybyk7XG5nYW1lLnN0YXRlLmFkZCgncGxheScsIFBsYXkpO1xuZ2FtZS5zdGF0ZS5hZGQoJ2dhbWUtb3ZlcicsIEdhbWVPdmVyKTtcblxuLy8gU3RhcnQgZ2FtZVxuZ2FtZS5zdGF0ZS5zdGFydCgnYm9vdCcpOyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVPdmVyIHtcclxuICBwcmVsb2FkKCl7XHJcbiAgICB0aGlzLmdhbWUubG9hZC5hdWRpbygnaW1wZXJpYWwtbWFyY2gnLCAnYXNzZXRzL3NvbmdzL2ltcGVyaWFsLW1hcmNoLm9nZycpO1xyXG4gICAgdGhpcy5nYW1lLmxvYWQuaW1hZ2UoJ2Jsb29kJywgJ2Fzc2V0cy9zcHJpdGVzL2Jsb29kLnBuZycpO1xyXG4gIH1cclxuXHJcbiAgaW5pdChzY29yZSl7XHJcbiAgICB0aGlzLnNjb3JlID0gc2NvcmU7XHJcbiAgfVxyXG5cclxuICBjcmVhdGUoKSB7XHJcbiAgICB0aGlzLnNmeCA9IHRoaXMuZ2FtZS5hZGQuYXVkaW8oJ2ltcGVyaWFsLW1hcmNoJyk7XHJcbiAgICB0aGlzLnNmeC5wbGF5KCk7XHJcblxyXG4gICAgdGhpcy5iYWNrZ3JvdW5kVGV4dHVyZSA9IHRoaXMuZ2FtZS5hZGQucmVuZGVyVGV4dHVyZSh0aGlzLmdhbWUud29ybGQud2lkdGgsIHRoaXMuZ2FtZS53b3JsZC5oZWlnaHQsICd0ZXh0dXJlJyk7XHJcbiAgICB0aGlzLmJsb29kVGV4dHVyZSA9IHRoaXMuZ2FtZS5tYWtlLnNwcml0ZSgwLCAwLCAnYmxvb2QnKTtcclxuICAgIHRoaXMuYmxvb2RUZXh0dXJlLmFuY2hvci5zZXRUbygwLjUsIDAuNSlcclxuICAgIHRoaXMuYmFja2dyb3VuZFRleHR1cmUucmVuZGVyWFkodGhpcy5ibG9vZFRleHR1cmUsIHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLCB0aGlzLmdhbWUud29ybGQuY2VudGVyWSk7XHJcbiAgICB0aGlzLmdhbWUuYWRkLnNwcml0ZSgwLCAwLCB0aGlzLmJhY2tncm91bmRUZXh0dXJlKTtcclxuXHJcbiAgICAvL1JlbmRlciB0ZXh0c1xyXG4gICAgdGhpcy5nYW1lLmFkZC50ZXh0KHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYIC0gMTQwLCB0aGlzLmdhbWUud29ybGQuY2VudGVyWSAtIDQwLCAnV0FTVEVEJywgeyBmb250OiAnNjJweCBBcmlhbCcsIGZpbGw6ICcjZmZmZmZmJyB9KTtcclxuICAgIHRoaXMuZ2FtZS5hZGQudGV4dCh0aGlzLmdhbWUud29ybGQuY2VudGVyWCAtIDUwLCB0aGlzLmdhbWUud29ybGQuY2VudGVyWSArIDQwLCBgJHt0aGlzLnNjb3JlfSBwb2ludHNgLCB7IGZvbnQ6ICcxNnB4IEFyaWFsJywgZmlsbDogJyNmZmZmZmYnIH0pO1xyXG4gICAgdGhpcy5nYW1lLmFkZC50ZXh0KHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYIC0gOTAsIHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJZICsgODAsICdbIHByZXNzIGEga2V5IHRvIHJlc3RhcnQgXScsIHsgZm9udDogJzE2cHggQXJpYWwnLCBmaWxsOiAnI2ZmZmZmZicgfSk7XHJcbiAgICB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQub25Eb3duQ2FsbGJhY2sgPSB0aGlzLmVudGVyUGxheS5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgZW50ZXJQbGF5KCkge1xyXG4gICAgdGhpcy5nYW1lLnN0YXRlLnN0YXJ0KCdwbGF5Jyk7XHJcbiAgfVxyXG5cclxuICBzaHV0ZG93bigpIHtcclxuICAgIHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5vbkRvd25DYWxsYmFjayA9IG51bGw7XHJcbiAgICB0aGlzLnNmeC5kZXN0cm95KCk7XHJcbiAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50cm8ge1xuXHRcblx0cHJlbG9hZCgpIHtcblx0XHR0aGlzLmdhbWUubG9hZC5pbWFnZSgndGlueXN0YXInLCAnYXNzZXRzL3Nwcml0ZXMvc3RhcjIucG5nJyk7XG5cdFx0dGhpcy5nYW1lLmxvYWQuYXVkaW8oJ21haW4tdGl0bGUnLCAnYXNzZXRzL3NvbmdzL21haW4tdGl0bGUub2dnJyk7XG5cdFx0dGhpcy5nYW1lLmxvYWQuYml0bWFwRm9udCgnZ2VtJywgJ2Fzc2V0cy9mb250cy9iaXRtYXBGb250cy9nZW0ucG5nJywgJ2Fzc2V0cy9mb250cy9iaXRtYXBGb250cy9nZW0ueG1sJyk7XG5cdH1cblxuXHRpbml0KCkge1xuXHRcdHRoaXMuY29uZmlnID0ge1xuXHRcdFx0Zm9udDoge1xuXHRcdFx0XHRuYW1lOiAnZ2VtJyxcblx0XHRcdFx0c2l6ZTogMjIsXG5cdFx0XHRcdHdpZHRoOiA1LjVcblx0XHRcdH0sXG5cdFx0XHRzdGFyOntcblx0XHRcdFx0ZGlzdGFuY2U6IDMwMCxcblx0XHRcdFx0bWF4OiAxMDAsXG5cdFx0XHRcdHNwZWVkOiAxMFxuXHRcdFx0fSxcblx0XHRcdGludHJvOiB7XG5cdFx0XHRcdGNvbnRlbnQ6IFx0XCJMYSBSw6lwdWJsaXF1ZSBHYWxhY3RpcXVlIGVzdCBlbiBwbGVpbmUgw6lidWxsaXRpb24uIExhIHRheGF0aW9uIGRlcyByb3V0ZXMgY29tbWVyY2lhbGVzIHJlbGlhbnQgbGVzIHN5c3TDqG1lcyDDqWxvaWduw6lzIHByb3ZvcXVlIGxhIGRpc2NvcmRlLlxcblwiICtcblx0XHRcdFx0XHRcdFx0XCJcXG5cIiArXG5cdFx0XHRcdFx0XHRcdFwiUG91ciByw6lnbGVyIGxhIHF1ZXN0aW9uLCBsYSBjdXBpZGUgRsOpZMOpcmF0aW9uIGR1IENvbW1lcmNlIGV0IHNlcyByZWRvdXRhYmxlcyB2YWlzc2VhdXggZGUgZ3VlcnJlIGltcG9zZW50IHVuIGJsb2N1cyDDoCBsYSBwZXRpdGUgcGxhbsOodGUgTmFib28uXFxuXCIgK1xuXHRcdFx0XHRcdFx0XHRcIlxcblwiICtcblx0XHRcdFx0XHRcdFx0XCJsZSBDaGFuY2VsaWVyIFN1cHLDqm1lIGNoYXJnZSBlbiBzZWNyZXQgZGV1eCBDaGV2YWxpZXJzIEplZGksIGdhcmRpZW5zIGRlIGxhIHBhaXggZXQgZGUgbGEganVzdGljZSBkYW5zIGxhIGdhbGF4aWUsIGRlIHLDqXNvdWRyZSBsZSBjb25mbGl0Li4uXCIsXG5cdFx0XHRcdGR1cmF0aW9uUGVyTGluZTogMjAwXG5cdFx0XHR9LFxuXHRcdFx0Y29udGludWU6IHtcblx0XHRcdFx0Y29udGVudDogJ1sgUHJlc3MgYSBrZXkgdG8gY29udGludWUgXScsXG5cdFx0XHRcdGRlbGF5OiA2MDAwLFxuXHRcdFx0XHRkdXJhdGlvbjogMjAwMFxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR0aGlzLnNlbnRlbmNlcyA9IHRoaXMuY29uZmlnLmludHJvLmNvbnRlbnQuc3BsaXQoXCJcXG5cIik7XG5cdFx0dGhpcy5zdGFycyA9IFtdO1xuXHRcdHRoaXMucG9pbnRzID0gW107XG5cdFx0dGhpcy5jdXJyZW50U2VudGVuY2VJbmRleCA9IDA7XG5cdFx0dGhpcy53YXJwTW9kZSA9IGZhbHNlO1xuXHR9XG5cblx0Y3JlYXRlKCkge1xuXHRcdHRoaXMuZ2FtZS5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAweDI3MjgyMjtcblxuXHRcdC8vQ3JlYXRlIHRleHR1cmVzXG5cdFx0dGhpcy5zdGFyc1RleHR1cmUgPSB0aGlzLmdhbWUuYWRkLnJlbmRlclRleHR1cmUodGhpcy5nYW1lLndvcmxkLndpZHRoLCB0aGlzLmdhbWUud29ybGQuaGVpZ2h0LCAndGV4dHVyZScpO1xuXHRcdHRoaXMuc3RhclRleHR1cmUgPSB0aGlzLmdhbWUubWFrZS5zcHJpdGUoMCwgMCwgJ3RpbnlzdGFyJyk7XG5cblx0XHQvLyBTdGFydCBzb3VuZFxuXHRcdHRoaXMuc2Z4ID0gdGhpcy5nYW1lLmFkZC5hdWRpbygnbWFpbi10aXRsZScpO1xuXHRcdHRoaXMuc2Z4LnBsYXkoKTtcblxuXHRcdC8vIEdlbmVyYXRlIHBvaW50cyBmb3Igc3RhciBsb2NhdGlvbnNcblx0XHR0aGlzLmdlbmVyYXRlUG9pbnRzKCk7XG5cblx0XHQvLyBBZGQgc3ByaXRlcyBhbmQgdGV4dHNcblx0XHR0aGlzLmdhbWUuYWRkLnNwcml0ZSgwLCAwLCB0aGlzLnN0YXJzVGV4dHVyZSk7XG5cblx0XHR0aGlzLmludHJvVGV4dCA9IHRoaXMuZ2FtZS5hZGQuYml0bWFwVGV4dChcblx0XHRcdHRoaXMuZ2FtZS53b3JsZC53aWR0aCAvIDIgLSB0aGlzLmNvbmZpZy5mb250LndpZHRoICogdGhpcy5zZW50ZW5jZXNbMF0ubGVuZ3RoLFxuXHRcdFx0dGhpcy5nYW1lLndvcmxkLmhlaWdodCAvIDIgLSB0aGlzLmNvbmZpZy5mb250LnNpemUgKiB0aGlzLnNlbnRlbmNlcy5sZW5ndGgsXG5cdFx0XHR0aGlzLmNvbmZpZy5mb250Lm5hbWUsXG5cdFx0XHQnJyxcblx0XHRcdHRoaXMuY29uZmlnLmZvbnQuc2l6ZVxuXHRcdCk7XG5cdFx0dGhpcy5zdGFydFRleHQgPSB0aGlzLmdhbWUuYWRkLmJpdG1hcFRleHQoXG5cdFx0XHR0aGlzLmdhbWUud29ybGQud2lkdGggLyAyIC0gdGhpcy5jb25maWcuZm9udC53aWR0aCAqIHRoaXMuY29uZmlnLmNvbnRpbnVlLmNvbnRlbnQubGVuZ3RoLFxuXHRcdFx0dGhpcy5nYW1lLndvcmxkLmhlaWdodCAvIDIgKyB0aGlzLmNvbmZpZy5mb250LnNpemUgKiB0aGlzLnNlbnRlbmNlcy5sZW5ndGgsXG5cdFx0XHR0aGlzLmNvbmZpZy5mb250Lm5hbWUsXG5cdFx0XHR0aGlzLmNvbmZpZy5jb250aW51ZS5jb250ZW50LFxuXHRcdFx0dGhpcy5jb25maWcuZm9udC5zaXplXG5cdFx0KTtcblxuXHRcdC8vIEJsaW5raW5nIHRleHRcblx0XHR0aGlzLnN0YXJ0VGV4dC5hbHBoYSA9IDA7XG5cdFx0dGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzLnN0YXJ0VGV4dCkudG8oe2FscGhhOiAxfSwgdGhpcy5jb25maWcuY29udGludWUuZHVyYXRpb24sIFBoYXNlci5FYXNpbmcuUXVhZHJhdGljLkluT3V0LCB0cnVlLCB0aGlzLmNvbmZpZy5jb250aW51ZS5kZWxheSk7XG5cblx0XHQvLyBEaXNwbGF5IGludHJvIHRleHQsIG9uZSBsaW5lIGF0IGEgdGltZVxuXHRcdHRoaXMuZ2FtZS50aW1lLmV2ZW50cy5yZXBlYXQoUGhhc2VyLlRpbWVyLlNFQ09ORCwgdGhpcy5jb25maWcuaW50cm8uZHVyYXRpb25QZXJMaW5lLCB0aGlzLmFkZE5leHRTZW50ZW5jZSwgdGhpcyk7XG5cblx0XHQvLyBXcmFwIG1vZGUgZm9yIHN0YXJzXG5cdFx0dGhpcy5nYW1lLnRpbWUuZXZlbnRzLmFkZCh0aGlzLmNvbmZpZy5jb250aW51ZS5kZWxheSwgdGhpcy5lbmFibGVXYXJwTW9kZSwgdGhpcyk7XG5cblx0XHQvLyBSZWdpc3RlciBrZXkgbGlzdGVuZXJzXG5cdFx0dGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLm9uRG93bkNhbGxiYWNrID0gdGhpcy5lbnRlclBsYXkuYmluZCh0aGlzKTtcblx0XHR0aGlzLmdhbWUuaW5wdXQub25Eb3duLmFkZCh0aGlzLnRvZ2dsZUZ1bGxzY3JlZW4sIHRoaXMpO1xuXHR9XG5cblx0dG9nZ2xlRnVsbHNjcmVlbigpIHtcblx0XHR0aGlzLmdhbWUuc2NhbGUuaXNGdWxsU2NyZWVuPyB0aGlzLmdhbWUuc2NhbGUuc3RvcEZ1bGxTY3JlZW4oKSA6IHRoaXMuZ2FtZS5zY2FsZS5zdGFydEZ1bGxTY3JlZW4oZmFsc2UpXG5cdH1cblxuXHRlbmFibGVXYXJwTW9kZSgpe1xuXHRcdHRoaXMud2FycE1vZGUgPSB0cnVlO1xuXHRcdHRoaXMuZ2FtZS50aW1lLmV2ZW50cy5yZXBlYXQoUGhhc2VyLlRpbWVyLlNFQ09ORCwgMjAsIGZ1bmN0aW9uKCl7XG5cdFx0XHR0aGlzLmdlbmVyYXRlUG9pbnRzKClcblx0XHR9LmJpbmQodGhpcyksIHRoaXMpO1xuXHR9XG5cblx0ZW50ZXJQbGF5KCl7XG5cdFx0dGhpcy5nYW1lLnN0YXRlLnN0YXJ0KCdwbGF5Jylcblx0fVxuXG5cdGFkZE5leHRTZW50ZW5jZSgpIHtcblx0XHRpZih0aGlzLmN1cnJlbnRTZW50ZW5jZUluZGV4IDwgdGhpcy5zZW50ZW5jZXMubGVuZ3RoKSB0aGlzLmludHJvVGV4dC50ZXh0ICs9IHRoaXMuc2VudGVuY2VzW3RoaXMuY3VycmVudFNlbnRlbmNlSW5kZXgrK10gKyBcIlxcblwiO1xuXHR9XG5cblx0Z2VuZXJhdGVQb2ludHMoKXtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29uZmlnLnN0YXIubWF4OyBpKyspIHtcblx0XHRcdHRoaXMucG9pbnRzLnB1c2goe1xuXHRcdFx0XHR4OiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmdhbWUud29ybGQud2lkdGgpIC0gdGhpcy5nYW1lLndvcmxkLndpZHRoLzIsXG5cdFx0XHRcdHk6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuZ2FtZS53b3JsZC5oZWlnaHQpIC0gdGhpcy5nYW1lLndvcmxkLmhlaWdodC8yLFxuXHRcdFx0XHR6OiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxNzAwKSAtIDEwMFxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0ZHJhd1N0YXJzKCl7XG5cdFx0bGV0IHN0YXJEaXN0YW5jZSA9IHRoaXMuY29uZmlnLnN0YXIuZGlzdGFuY2U7XG5cdFx0dGhpcy5wb2ludHMuZm9yRWFjaChmdW5jdGlvbihwb2ludCl7XG5cdFx0XHRsZXQgcGVyc3BlY3RpdmUgPSBzdGFyRGlzdGFuY2UgLyAoc3RhckRpc3RhbmNlIC0gcG9pbnQueiksXG5cdFx0XHRcdHggPSB0aGlzLmdhbWUud29ybGQuY2VudGVyWCArIHBvaW50LnggKiBwZXJzcGVjdGl2ZSxcblx0XHRcdFx0eSA9IHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJZICsgcG9pbnQueSAqIHBlcnNwZWN0aXZlO1xuXG5cdFx0XHRwb2ludC56ICs9IHRoaXMuY29uZmlnLnN0YXIuc3BlZWQ7XG5cblx0XHRcdGlmIChwb2ludC56ID4gMjAwKSBwb2ludC56IC09IDYwMDtcblx0XHRcdHRoaXMuc3RhcnNUZXh0dXJlLnJlbmRlclhZKHRoaXMuc3RhclRleHR1cmUsIHgsIHkpO1xuXHRcdH0uYmluZCh0aGlzKSk7XG5cdH1cblxuXHRyZWRyYXdTdGFycygpe1xuXHRcdHRoaXMuc3RhcnNUZXh0dXJlLmNsZWFyKCk7XG5cdFx0dGhpcy5kcmF3U3RhcnMoKTtcblx0fVxuXG5cdHVwZGF0ZSgpIHtcblx0XHR0aGlzLndhcnBNb2RlPyB0aGlzLmRyYXdTdGFycygpIDogdGhpcy5yZWRyYXdTdGFycygpXG5cdH1cblxuXHRzaHV0ZG93bigpIHtcblx0XHR0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQub25Eb3duQ2FsbGJhY2sgPSBudWxsO1xuXHRcdHRoaXMuc2Z4LmRlc3Ryb3koKVxuXHR9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheSB7XHJcbiAgcHJlbG9hZCgpIHtcclxuICAgIHRoaXMuZ2FtZS5sb2FkLmF1ZGlvKCdjYW50aW5hLXNvbmcnLCAnYXNzZXRzL3NvbmdzL2NhbnRpbmEtc29uZy5vZ2cnKTtcclxuICAgIHRoaXMuZ2FtZS5sb2FkLmltYWdlKHRoaXMuY29uZmlnLnhXaW5nLm5hbWUsIHRoaXMuY29uZmlnLnhXaW5nLnBhdGgpO1xyXG4gICAgdGhpcy5nYW1lLmxvYWQuaW1hZ2UoJ3RpbnlzdGFyJywgJ2Fzc2V0cy9zcHJpdGVzL3N0YXIyLnBuZycpO1xyXG5cclxuICAgIC8vRHluYW1pY2FsbHkgcHJlbG9hZCBpbWFnZXNcclxuICAgIGZvcihsZXQgaT0wOyBpIDwgdGhpcy5jb25maWcuc2hpcC5udW1iZXI7IGkrKyl7XHJcbiAgICAgIHRoaXMuZ2FtZS5sb2FkLmltYWdlKGBzaGlwLSR7aX1gLCBgYXNzZXRzL3Nwcml0ZXMvJHtpfS5wbmdgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGluaXQoKXtcclxuICAgIHRoaXMuY29uZmlnID0ge1xyXG4gICAgICAgIHhXaW5nOiB7XHJcbiAgICAgICAgICBuYW1lOiAneC13aW5nJyxcclxuICAgICAgICAgIHBhdGg6ICdhc3NldHMvc3ByaXRlcy94LXdpbmcucG5nJyxcclxuICAgICAgICAgIHdpZHRoOiAyMjIsXHJcbiAgICAgICAgICBoZWlnaHQ6IDI1MFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3Rhcjp7XHJcbiAgICAgICAgICBkaXN0YW5jZTogMTAsXHJcbiAgICAgICAgICBtYXg6IDEwMCxcclxuICAgICAgICAgIHNwZWVkOiAxMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2hpcDp7XHJcbiAgICAgICAgICBzY2FsZVJhdGlvOiAwLjUsXHJcbiAgICAgICAgICBzcGF3blJhdGU6IDAuMDEsXHJcbiAgICAgICAgICBudW1iZXI6IDQ1XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFxyXG4gICAgdGhpcy5zdGFycyA9IFtdO1xyXG4gICAgdGhpcy5wb2ludHMgPSBbXTtcclxuICAgIHRoaXMuYWxpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5zY29yZSA9IDA7XHJcbiAgfVxyXG5cclxuICBjcmVhdGUoKSB7XHJcbiAgICAvLyBTdGFydCBhdWRpb1xyXG4gICAgdGhpcy5zZnggPSB0aGlzLmdhbWUuYWRkLmF1ZGlvKCdjYW50aW5hLXNvbmcnKTtcclxuICAgIHRoaXMuc2Z4LnBsYXkoKTtcclxuXHJcbiAgICAvLyBDcmVhdGUgdGV4dHVyZXNcclxuICAgIHRoaXMuc3RhcnNUZXh0dXJlID0gdGhpcy5nYW1lLmFkZC5yZW5kZXJUZXh0dXJlKHRoaXMuZ2FtZS53b3JsZC53aWR0aCwgdGhpcy5nYW1lLndvcmxkLmhlaWdodCwgJ3RleHR1cmUnKTtcclxuICAgIHRoaXMuc3RhclRleHR1cmUgPSB0aGlzLmdhbWUubWFrZS5zcHJpdGUoMCwgMCwgJ3RpbnlzdGFyJyk7XHJcbiAgICB0aGlzLmdhbWUuYWRkLnNwcml0ZSgwLCAwLCB0aGlzLnN0YXJzVGV4dHVyZSk7XHJcblxyXG4gICAgLy8gQ3JlYXRlIHBsYXllciBzaGlwXHJcbiAgICB0aGlzLnBsYXllclNoaXAgPSB0aGlzLmdhbWUuYWRkLnNwcml0ZSh0aGlzLmdhbWUud29ybGQuY2VudGVyWCAtIHRoaXMuY29uZmlnLnhXaW5nLndpZHRoIC8gNCwgdGhpcy5nYW1lLndvcmxkLmhlaWdodCAtIDIwMCwgJ3gtd2luZycpO1xyXG4gICAgdGhpcy5wbGF5ZXJTaGlwLnNjYWxlLnNldFRvKHRoaXMuY29uZmlnLnNoaXAuc2NhbGVSYXRpbywgdGhpcy5jb25maWcuc2hpcC5zY2FsZVJhdGlvKTtcclxuICAgIHRoaXMuZ2FtZS5waHlzaWNzLmVuYWJsZSh0aGlzLnBsYXllclNoaXAsIFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XHJcbiAgICB0aGlzLnBsYXllclNoaXAuYm9keS5zZXRTaXplKHRoaXMuY29uZmlnLnhXaW5nLndpZHRoLCB0aGlzLmNvbmZpZy54V2luZy5oZWlnaHQpO1xyXG5cclxuICAgIC8vIENyZWF0ZSBvYnN0YWNsZXMgZ3JvdXBcclxuICAgIHRoaXMub2JzdGFjbGVzID0gdGhpcy5nYW1lLmFkZC5ncm91cCgpO1xyXG4gICAgdGhpcy5vYnN0YWNsZXMuZW5hYmxlQm9keSA9IHRydWU7XHJcbiAgICB0aGlzLm9ic3RhY2xlcy5waHlzaWNzQm9keVR5cGUgPSBQaGFzZXIuUGh5c2ljcy5BUkNBREU7XHJcblxyXG4gICAgdGhpcy5nZW5lcmF0ZU5ld0VuZW1pZXMoKTtcclxuICAgIHRoaXMuZ2VuZXJhdGVQb2ludHMoKTtcclxuICAgIFxyXG4gICAgdGhpcy5jdXJzb3JzID0gdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLmNyZWF0ZUN1cnNvcktleXMoKTtcclxuXHJcbiAgICAvL0FkZCBpbmZvIGFuZCBzY29yZSB0ZXh0c1xyXG4gICAgdGhpcy5nYW1lLmFkZC50ZXh0KDE2LCAxNiwgJ0Fycm93cyB0byBtb3ZlJywgeyBmb250OiAnMTRweCBBcmlhbCcsIGZpbGw6ICcjZmZmZmZmJyB9KTtcclxuICAgIHRoaXMuc2NvcmVUZXh0ID0gdGhpcy5nYW1lLmFkZC50ZXh0KHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYIC0gdGhpcy5zY29yZS50b1N0cmluZygpLmxlbmd0aCAqIDIwLCAxNiwgJycsIHsgZm9udDogJzE0cHggQXJpYWwnLCBmaWxsOiAnI2ZmZmZmZicgfSk7XHJcblxyXG4gICAgdGhpcy5nYW1lLnRpbWUuZXZlbnRzLnJlcGVhdChQaGFzZXIuVGltZXIuU0VDT05ELCAxMDAsIHRoaXMuZ2VuZXJhdGVOZXdFbmVtaWVzLCB0aGlzKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpIHtcclxuICAgIGlmKHRoaXMuYWxpdmUpe1xyXG4gICAgICB0aGlzLnJlZHJhd1N0YXJzKCk7XHJcblxyXG4gICAgICAvLyBDaGVjayBjb2xsaXNpb25zXHJcbiAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMucGxheWVyU2hpcCwgdGhpcy5vYnN0YWNsZXMsIHRoaXMuY29sbGlzaW9uSGFuZGxlciwgbnVsbCwgdGhpcyk7XHJcbiAgICAgIHRoaXMucGxheWVyU2hpcC5ib2R5LmNvbGxpZGVXb3JsZEJvdW5kcyA9IHRydWU7XHJcbiAgICAgIHRoaXMucGxheWVyU2hpcC5ib2R5LnZlbG9jaXR5LnNldCgwKTtcclxuXHJcbiAgICAgIC8vIE1vdmUgcGxheWVyU2hpcFxyXG4gICAgICBzd2l0Y2godHJ1ZSl7XHJcbiAgICAgICAgY2FzZSB0aGlzLmN1cnNvcnMubGVmdC5pc0Rvd246XHJcbiAgICAgICAgICB0aGlzLnBsYXllclNoaXAuYm9keS52ZWxvY2l0eS54ID0gLTEwMDA7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIHRoaXMuY3Vyc29ycy5yaWdodC5pc0Rvd246XHJcbiAgICAgICAgICB0aGlzLnBsYXllclNoaXAuYm9keS52ZWxvY2l0eS54ID0gMTAwMDtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgdGhpcy5jdXJzb3JzLnVwLmlzRG93bjpcclxuICAgICAgICAgIHRoaXMucGxheWVyU2hpcC5ib2R5LnZlbG9jaXR5LnkgPSAtMTAwMDtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgdGhpcy5jdXJzb3JzLmRvd24uaXNEb3duOlxyXG4gICAgICAgICAgdGhpcy5wbGF5ZXJTaGlwLmJvZHkudmVsb2NpdHkueSA9IDEwMDA7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gVXBkYXRlIHNjb3JlIHRleHRcclxuICAgICAgdGhpcy5zY29yZSArPSBNYXRoLnJvdW5kKCh0aGlzLmdhbWUud29ybGQuaGVpZ2h0IC0gdGhpcy5wbGF5ZXJTaGlwLnkpIC8gMjAwKTtcclxuICAgICAgdGhpcy5zY29yZVRleHQudGV4dCA9IGBTY29yZSA6ICR7dGhpcy5zY29yZX1gO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29sbGlzaW9uSGFuZGxlcigpe1xyXG4gICAgdGhpcy5hbGl2ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5nYW1lLnN0YXRlLnN0YXJ0KCdnYW1lLW92ZXInLCB0cnVlLCBmYWxzZSwgdGhpcy5zY29yZSk7XHJcbiAgfVxyXG5cclxuICBnZW5lcmF0ZU5ld0VuZW1pZXMoKSB7XHJcbiAgICBmb3IobGV0IGk9MDsgaSA8IHRoaXMuY29uZmlnLnNoaXAubnVtYmVyOyBpKyspe1xyXG4gICAgICBpZihNYXRoLnJhbmRvbSgpIDwgdGhpcy5jb25maWcuc2hpcC5zcGF3blJhdGUpe1xyXG4gICAgICAgIC8vQ3JlYXRlIGVuZW15IGluIG9ic2FjbGUgZ3JvdXAgYXQgYSByYW5kb20gcG9zaXRpb24gYWJvdmUgdGhlIHNjcmVlbiBhbmQgZGVmaW5lIHBoeXNpY3NcclxuICAgICAgICBsZXQgZW5lbXkgPSB0aGlzLmdhbWUuYWRkLnNwcml0ZShNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmdhbWUud29ybGQud2lkdGgpLCAtTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5nYW1lLndvcmxkLmhlaWdodCksIGBzaGlwLSR7aX1gKTtcclxuICAgICAgICBlbmVteS5zY2FsZS5zZXRUbyh0aGlzLmNvbmZpZy5zaGlwLnNjYWxlUmF0aW8sIHRoaXMuY29uZmlnLnNoaXAuc2NhbGVSYXRpbyk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnBoeXNpY3MuZW5hYmxlKGVuZW15LCBQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xyXG4gICAgICAgIGVuZW15LmJvZHkudmVsb2NpdHkueSA9IDcwMDtcclxuICAgICAgICB0aGlzLm9ic3RhY2xlcy5hZGQoZW5lbXkpO1xyXG4gICAgICAgIHRoaXMuY29uZmlnLnNoaXAuc3Bhd25SYXRlICs9IDAuMDAxO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZW5lcmF0ZVBvaW50cygpe1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbmZpZy5zdGFyLm1heDsgaSsrKSB7XHJcbiAgICAgIHRoaXMucG9pbnRzLnB1c2goe1xyXG4gICAgICAgIHg6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuZ2FtZS53b3JsZC53aWR0aCksXHJcbiAgICAgICAgeTogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5nYW1lLndvcmxkLmhlaWdodClcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkcmF3U3RhcnMoKXtcclxuICAgIHRoaXMucG9pbnRzLmZvckVhY2goZnVuY3Rpb24ocG9pbnQpe1xyXG4gICAgICBwb2ludC55ICs9IHRoaXMuY29uZmlnLnN0YXIuZGlzdGFuY2U7XHJcbiAgICAgIGlmIChwb2ludC55ID4gdGhpcy5nYW1lLndvcmxkLmhlaWdodCkgcG9pbnQueSA9IDA7XHJcbiAgICAgIHRoaXMuc3RhcnNUZXh0dXJlLnJlbmRlclhZKHRoaXMuc3RhclRleHR1cmUsIHBvaW50LngsIHBvaW50LnkpO1xyXG4gICAgfS5iaW5kKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIHJlZHJhd1N0YXJzKCl7XHJcbiAgICB0aGlzLnN0YXJzVGV4dHVyZS5jbGVhcigpO1xyXG4gICAgdGhpcy5kcmF3U3RhcnMoKTtcclxuICB9XHJcblxyXG4gIHNodXRkb3duKCl7XHJcbiAgICB0aGlzLnNmeC5kZXN0cm95KClcclxuICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQcmVsb2FkIHtcblx0cHJlbG9hZCgpIHtcblxuXHR9XG5cblx0Y3JlYXRlKCkge1xuXHRcdHRoaXMuZ2FtZS5zdGF0ZS5zdGFydCgnaW50cm8nKTtcblx0fVxufSJdfQ==
