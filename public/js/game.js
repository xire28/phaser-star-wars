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
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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

var game = new Phaser.Game('100', '100', Phaser.AUTO);

game.state.add('boot', _Boot2['default']);
game.state.add('preload', _Preload2['default']);
game.state.add('intro', _Intro2['default']);
game.state.add('play', _Play2['default']);
game.state.add('game-over', _GameOver2['default']);
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

      this.game.add.text(this.game.world.centerX - 140, this.game.world.centerY - 40, 'WASTED', { font: '62px Arial', fill: '#ffffff' });
      this.game.add.text(this.game.world.centerX - 50, this.game.world.centerY + 40, this.score + ' points', { font: '16px Arial', fill: '#ffffff' });
      this.game.add.text(this.game.world.centerX - 90, this.game.world.centerY + 80, '[ press a key to restart ]', { font: '16px Arial', fill: '#ffffff' });
      this.game.input.keyboard.onDownCallback = this.enterPlay.bind(this);
    }
  }, {
    key: 'enterPlay',
    value: function enterPlay() {
      this.game.input.keyboard.onDownCallback = null;
      this.game.state.start('play');
    }
  }, {
    key: 'shutdown',
    value: function shutdown() {
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

			this.starsTexture = this.game.add.renderTexture(this.game.world.width, this.game.world.height, 'texture');
			this.starTexture = this.game.make.sprite(0, 0, 'tinystar');
			this.sfx = this.game.add.audio('main-title');

			this.sfx.play();

			this.generatePoints();
			this.game.add.sprite(0, 0, this.starsTexture);
			this.introText = this.game.add.bitmapText(this.game.world.width / 2 - this.config.font.width * this.sentences[0].length, this.game.world.height / 2 - this.config.font.size * this.sentences.length, this.config.font.name, '', this.config.font.size);

			this.startText = this.game.add.bitmapText(this.game.world.width / 2 - this.config.font.width * this.config['continue'].content.length, this.game.world.height / 2 + this.config.font.size * this.sentences.length, this.config.font.name, this.config['continue'].content, this.config.font.size);
			this.startText.alpha = 0;

			this.game.time.events.repeat(Phaser.Timer.SECOND, this.config.intro.durationPerLine, this.addNextSentence, this);
			this.game.add.tween(this.startText).to({ alpha: 1 }, this.config['continue'].duration, Phaser.Easing.Quadratic.InOut, true, this.config['continue'].delay);
			this.game.time.events.add(this.config['continue'].delay, this.enableWarpMode, this);
			this.game.input.keyboard.onDownCallback = this.enterPlay.bind(this);
			this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
			this.game.input.onDown.add(this.fullscreen, this);
		}
	}, {
		key: 'fullscreen',
		value: function fullscreen() {
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
			this.game.input.keyboard.onDownCallback = null;
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
			if (this.warpMode) {
				this.drawStars();
			} else {
				this.redrawStars();
			}
		}
	}, {
		key: 'shutdown',
		value: function shutdown() {
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
    }
  }, {
    key: 'create',
    value: function create() {
      this.alive = true;
      this.score = 0;

      this.sfx = this.game.add.audio('cantina-song');
      this.sfx.play();

      this.starsTexture = this.game.add.renderTexture(this.game.world.width, this.game.world.height, 'texture');
      this.starTexture = this.game.make.sprite(0, 0, 'tinystar');
      this.game.add.sprite(0, 0, this.starsTexture);

      this.playerShip = this.game.add.sprite(this.game.world.centerX - this.config.xWing.width / 4, this.game.world.height - 200, 'x-wing');
      this.playerShip.scale.setTo(this.config.ship.scaleRatio, this.config.ship.scaleRatio);

      this.obstacles = this.game.add.group();
      this.obstacles.enableBody = true;
      this.obstacles.physicsBodyType = Phaser.Physics.ARCADE;

      this.generateNewEnemies();
      this.generatePoints();

      this.game.physics.enable(this.playerShip, Phaser.Physics.ARCADE);
      this.playerShip.body.setSize(this.config.xWing.width, this.config.xWing.height);
      this.cursors = this.game.input.keyboard.createCursorKeys();

      this.game.add.text(16, 16, 'Arrows to move', { font: '14px Arial', fill: '#ffffff' });
      this.scoreText = this.game.add.text(this.game.world.centerX - this.score.toString().length * 20, 16, '', { font: '14px Arial', fill: '#ffffff' });

      this.game.time.events.repeat(Phaser.Timer.SECOND, 100, this.generateNewEnemies, this);
    }

    /*
    render(){
      this.obstacles.forEachAlive(this.debug, this);
    }
      debug(member){
      this.game.debug.body(member);
    }
    */

  }, {
    key: 'update',
    value: function update() {
      if (this.alive) {
        this.redrawStars();
        this.game.physics.arcade.collide(this.playerShip, this.obstacles, this.collisionHandler, null, this);
        this.playerShip.body.collideWorldBounds = true;
        this.playerShip.body.velocity.set(0);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDOi93YW1wL3d3dy9waGFzZXItc3Rhci13YXJzL3NyYy9Cb290LmpzIiwiQzovd2FtcC93d3cvcGhhc2VyLXN0YXItd2Fycy9zcmMvR2FtZS5qcyIsIkM6L3dhbXAvd3d3L3BoYXNlci1zdGFyLXdhcnMvc3JjL0dhbWVPdmVyLmpzIiwiQzovd2FtcC93d3cvcGhhc2VyLXN0YXItd2Fycy9zcmMvSW50cm8uanMiLCJDOi93YW1wL3d3dy9waGFzZXItc3Rhci13YXJzL3NyYy9QbGF5LmpzIiwiQzovd2FtcC93d3cvcGhhc2VyLXN0YXItd2Fycy9zcmMvUHJlbG9hZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7SUNBcUIsSUFBSTtVQUFKLElBQUk7d0JBQUosSUFBSTs7O2NBQUosSUFBSTs7U0FDakIsbUJBQUcsRUFFVDs7O1NBRUssa0JBQUc7QUFDUixPQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7R0FDakM7OztRQVBtQixJQUFJOzs7cUJBQUosSUFBSTs7Ozs7Ozs7b0JDRVIsUUFBUTs7Ozt1QkFDTCxXQUFXOzs7O3FCQUNiLFNBQVM7Ozs7b0JBQ1YsUUFBUTs7Ozt3QkFDSixZQUFZOzs7O0FBTmpDLElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFRdEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxvQkFBTyxDQUFDO0FBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsdUJBQVUsQ0FBQztBQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLHFCQUFRLENBQUM7QUFDL0IsSUFBSSxDQUFD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LEVBQUUsQ0FBQTtLQUNuQjs7O1NBaEprQixJQUFJOzs7cUJBQUosSUFBSTs7Ozs7Ozs7Ozs7Ozs7SUNBSixPQUFPO1VBQVAsT0FBTzt3QkFBUCxPQUFPOzs7Y0FBUCxPQUFPOztTQUNwQixtQkFBRyxFQUVUOzs7U0FFSyxrQkFBRztBQUNSLE9BQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztHQUMvQjs7O1FBUG1CLE9BQU87OztxQkFBUCxPQUFPIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvb3Qge1xuXHRwcmVsb2FkKCkge1xuXG5cdH1cblxuXHRjcmVhdGUoKSB7XG5cdFx0dGhpcy5nYW1lLnN0YXRlLnN0YXJ0KCdwcmVsb2FkJyk7XG5cdH1cbn0iLCJsZXQgZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZSgnMTAwJywgJzEwMCcsIFBoYXNlci5BVVRPKTtcblxuaW1wb3J0IEJvb3QgZnJvbSAnLi9Cb290J1xuaW1wb3J0IFByZWxvYWQgZnJvbSAnLi9QcmVsb2FkJ1xuaW1wb3J0IEludHJvIGZyb20gJy4vSW50cm8nXG5pbXBvcnQgUGxheSBmcm9tICcuL1BsYXknXG5pbXBvcnQgR2FtZU92ZXIgZnJvbSAnLi9HYW1lT3ZlcidcblxuZ2FtZS5zdGF0ZS5hZGQoJ2Jvb3QnLCBCb290KTtcbmdhbWUuc3RhdGUuYWRkKCdwcmVsb2FkJywgUHJlbG9hZCk7XG5nYW1lLnN0YXRlLmFkZCgnaW50cm8nLCBJbnRybyk7XG5nYW1lLnN0YXRlLmFkZCgncGxheScsIFBsYXkpO1xuZ2FtZS5zdGF0ZS5hZGQoJ2dhbWUtb3ZlcicsIEdhbWVPdmVyKTtcbmdhbWUuc3RhdGUuc3RhcnQoJ2Jvb3QnKTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lT3ZlciB7XHJcbiAgcHJlbG9hZCgpe1xyXG4gICAgdGhpcy5nYW1lLmxvYWQuYXVkaW8oJ2ltcGVyaWFsLW1hcmNoJywgJ2Fzc2V0cy9zb25ncy9pbXBlcmlhbC1tYXJjaC5vZ2cnKTtcclxuICAgIHRoaXMuZ2FtZS5sb2FkLmltYWdlKCdibG9vZCcsICdhc3NldHMvc3ByaXRlcy9ibG9vZC5wbmcnKTtcclxuICB9XHJcblxyXG4gIGluaXQoc2NvcmUpe1xyXG4gICAgdGhpcy5zY29yZSA9IHNjb3JlO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlKCkge1xyXG4gICAgdGhpcy5zZnggPSB0aGlzLmdhbWUuYWRkLmF1ZGlvKCdpbXBlcmlhbC1tYXJjaCcpO1xyXG4gICAgdGhpcy5zZngucGxheSgpO1xyXG5cclxuICAgIHRoaXMuYmFja2dyb3VuZFRleHR1cmUgPSB0aGlzLmdhbWUuYWRkLnJlbmRlclRleHR1cmUodGhpcy5nYW1lLndvcmxkLndpZHRoLCB0aGlzLmdhbWUud29ybGQuaGVpZ2h0LCAndGV4dHVyZScpO1xyXG4gICAgdGhpcy5ibG9vZFRleHR1cmUgPSB0aGlzLmdhbWUubWFrZS5zcHJpdGUoMCwgMCwgJ2Jsb29kJyk7XHJcbiAgICB0aGlzLmJsb29kVGV4dHVyZS5hbmNob3Iuc2V0VG8oMC41LCAwLjUpXHJcbiAgICB0aGlzLmJhY2tncm91bmRUZXh0dXJlLnJlbmRlclhZKHRoaXMuYmxvb2RUZXh0dXJlLCB0aGlzLmdhbWUud29ybGQuY2VudGVyWCwgdGhpcy5nYW1lLndvcmxkLmNlbnRlclkpO1xyXG4gICAgdGhpcy5nYW1lLmFkZC5zcHJpdGUoMCwgMCwgdGhpcy5iYWNrZ3JvdW5kVGV4dHVyZSk7XHJcblxyXG5cclxuICAgIHRoaXMuZ2FtZS5hZGQudGV4dCh0aGlzLmdhbWUud29ybGQuY2VudGVyWCAtIDE0MCwgdGhpcy5nYW1lLndvcmxkLmNlbnRlclkgLSA0MCwgJ1dBU1RFRCcsIHsgZm9udDogJzYycHggQXJpYWwnLCBmaWxsOiAnI2ZmZmZmZicgfSk7XHJcbiAgICB0aGlzLmdhbWUuYWRkLnRleHQodGhpcy5nYW1lLndvcmxkLmNlbnRlclggLSA1MCwgdGhpcy5nYW1lLndvcmxkLmNlbnRlclkgKyA0MCwgYCR7dGhpcy5zY29yZX0gcG9pbnRzYCwgeyBmb250OiAnMTZweCBBcmlhbCcsIGZpbGw6ICcjZmZmZmZmJyB9KTtcclxuICAgIHRoaXMuZ2FtZS5hZGQudGV4dCh0aGlzLmdhbWUud29ybGQuY2VudGVyWCAtIDkwLCB0aGlzLmdhbWUud29ybGQuY2VudGVyWSArIDgwLCAnWyBwcmVzcyBhIGtleSB0byByZXN0YXJ0IF0nLCB7IGZvbnQ6ICcxNnB4IEFyaWFsJywgZmlsbDogJyNmZmZmZmYnIH0pO1xyXG4gICAgdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLm9uRG93bkNhbGxiYWNrID0gdGhpcy5lbnRlclBsYXkuYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIGVudGVyUGxheSgpIHtcclxuICAgIHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5vbkRvd25DYWxsYmFjayA9IG51bGw7XHJcbiAgICB0aGlzLmdhbWUuc3RhdGUuc3RhcnQoJ3BsYXknKTtcclxuICB9XHJcblxyXG4gIHNodXRkb3duKCkge1xyXG4gICAgdGhpcy5zZnguZGVzdHJveSgpO1xyXG4gIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEludHJvIHtcblx0XG5cdHByZWxvYWQoKSB7XG5cdFx0dGhpcy5nYW1lLmxvYWQuaW1hZ2UoJ3RpbnlzdGFyJywgJ2Fzc2V0cy9zcHJpdGVzL3N0YXIyLnBuZycpO1xuXHRcdHRoaXMuZ2FtZS5sb2FkLmF1ZGlvKCdtYWluLXRpdGxlJywgJ2Fzc2V0cy9zb25ncy9tYWluLXRpdGxlLm9nZycpO1xuXHRcdHRoaXMuZ2FtZS5sb2FkLmJpdG1hcEZvbnQoJ2dlbScsICdhc3NldHMvZm9udHMvYml0bWFwRm9udHMvZ2VtLnBuZycsICdhc3NldHMvZm9udHMvYml0bWFwRm9udHMvZ2VtLnhtbCcpO1xuXHR9XG5cblx0aW5pdCgpIHtcblx0XHR0aGlzLmNvbmZpZyA9IHtcblx0XHRcdGZvbnQ6IHtcblx0XHRcdFx0bmFtZTogJ2dlbScsXG5cdFx0XHRcdHNpemU6IDIyLFxuXHRcdFx0XHR3aWR0aDogNS41XG5cdFx0XHR9LFxuXHRcdFx0c3Rhcjp7XG5cdFx0XHRcdGRpc3RhbmNlOiAzMDAsXG5cdFx0XHRcdG1heDogMTAwLFxuXHRcdFx0XHRzcGVlZDogMTBcblx0XHRcdH0sXG5cdFx0XHRpbnRybzoge1xuXHRcdFx0XHRjb250ZW50OiBcIkxhIFLDqXB1YmxpcXVlIEdhbGFjdGlxdWUgZXN0IGVuIHBsZWluZSDDqWJ1bGxpdGlvbi4gTGEgdGF4YXRpb24gZGVzIHJvdXRlcyBjb21tZXJjaWFsZXMgcmVsaWFudCBsZXMgc3lzdMOobWVzIMOpbG9pZ27DqXMgcHJvdm9xdWUgbGEgZGlzY29yZGUuXFxuXCIgK1xuXHRcdFx0XHRcdFwiXFxuXCIgK1xuXHRcdFx0XHRcIlBvdXIgcsOpZ2xlciBsYSBxdWVzdGlvbiwgbGEgY3VwaWRlIEbDqWTDqXJhdGlvbiBkdSBDb21tZXJjZSBldCBzZXMgcmVkb3V0YWJsZXMgdmFpc3NlYXV4IGRlIGd1ZXJyZSBpbXBvc2VudCB1biBibG9jdXMgw6AgbGEgcGV0aXRlIHBsYW7DqHRlIE5hYm9vLlxcblwiICtcblx0XHRcdFx0XCJcXG5cIiArXG5cdFx0XHRcdFwibGUgQ2hhbmNlbGllciBTdXByw6ptZSBjaGFyZ2UgZW4gc2VjcmV0IGRldXggQ2hldmFsaWVycyBKZWRpLCBnYXJkaWVucyBkZSBsYSBwYWl4IGV0IGRlIGxhIGp1c3RpY2UgZGFucyBsYSBnYWxheGllLCBkZSByw6lzb3VkcmUgbGUgY29uZmxpdC4uLlwiLFxuXHRcdFx0XHRkdXJhdGlvblBlckxpbmU6IDIwMFxuXHRcdFx0fSxcblx0XHRcdGNvbnRpbnVlOiB7XG5cdFx0XHRcdGNvbnRlbnQ6ICdbIFByZXNzIGEga2V5IHRvIGNvbnRpbnVlIF0nLFxuXHRcdFx0XHRkZWxheTogNjAwMCxcblx0XHRcdFx0ZHVyYXRpb246IDIwMDBcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0dGhpcy5zZW50ZW5jZXMgPSB0aGlzLmNvbmZpZy5pbnRyby5jb250ZW50LnNwbGl0KFwiXFxuXCIpO1xuXHRcdHRoaXMuc3RhcnMgPSBbXTtcblx0XHR0aGlzLnBvaW50cyA9IFtdO1xuXHRcdHRoaXMuY3VycmVudFNlbnRlbmNlSW5kZXggPSAwO1xuXG5cdFx0dGhpcy53YXJwTW9kZSA9IGZhbHNlO1xuXHR9XG5cblx0Y3JlYXRlKCkge1xuXHRcdHRoaXMuZ2FtZS5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAweDI3MjgyMjtcblxuXHRcdHRoaXMuc3RhcnNUZXh0dXJlID0gdGhpcy5nYW1lLmFkZC5yZW5kZXJUZXh0dXJlKHRoaXMuZ2FtZS53b3JsZC53aWR0aCwgdGhpcy5nYW1lLndvcmxkLmhlaWdodCwgJ3RleHR1cmUnKTtcblx0XHR0aGlzLnN0YXJUZXh0dXJlID0gdGhpcy5nYW1lLm1ha2Uuc3ByaXRlKDAsIDAsICd0aW55c3RhcicpO1xuXHRcdHRoaXMuc2Z4ID0gdGhpcy5nYW1lLmFkZC5hdWRpbygnbWFpbi10aXRsZScpO1xuXG5cdFx0dGhpcy5zZngucGxheSgpO1xuXG5cdFx0dGhpcy5nZW5lcmF0ZVBvaW50cygpO1xuXHRcdHRoaXMuZ2FtZS5hZGQuc3ByaXRlKDAsIDAsIHRoaXMuc3RhcnNUZXh0dXJlKTtcblx0XHR0aGlzLmludHJvVGV4dCA9IHRoaXMuZ2FtZS5hZGQuYml0bWFwVGV4dChcblx0XHRcdHRoaXMuZ2FtZS53b3JsZC53aWR0aCAvIDIgLSB0aGlzLmNvbmZpZy5mb250LndpZHRoICogdGhpcy5zZW50ZW5jZXNbMF0ubGVuZ3RoLFxuXHRcdFx0dGhpcy5nYW1lLndvcmxkLmhlaWdodCAvIDIgLSB0aGlzLmNvbmZpZy5mb250LnNpemUgKiB0aGlzLnNlbnRlbmNlcy5sZW5ndGgsXG5cdFx0XHR0aGlzLmNvbmZpZy5mb250Lm5hbWUsXG5cdFx0XHQnJyxcblx0XHRcdHRoaXMuY29uZmlnLmZvbnQuc2l6ZVxuXHRcdCk7XG5cblx0XHR0aGlzLnN0YXJ0VGV4dCA9IHRoaXMuZ2FtZS5hZGQuYml0bWFwVGV4dChcblx0XHRcdHRoaXMuZ2FtZS53b3JsZC53aWR0aCAvIDIgLSB0aGlzLmNvbmZpZy5mb250LndpZHRoICogdGhpcy5jb25maWcuY29udGludWUuY29udGVudC5sZW5ndGgsXG5cdFx0XHR0aGlzLmdhbWUud29ybGQuaGVpZ2h0IC8gMiArIHRoaXMuY29uZmlnLmZvbnQuc2l6ZSAqIHRoaXMuc2VudGVuY2VzLmxlbmd0aCxcblx0XHRcdHRoaXMuY29uZmlnLmZvbnQubmFtZSxcblx0XHRcdHRoaXMuY29uZmlnLmNvbnRpbnVlLmNvbnRlbnQsXG5cdFx0XHR0aGlzLmNvbmZpZy5mb250LnNpemVcblx0XHQpO1xuXHRcdHRoaXMuc3RhcnRUZXh0LmFscGhhID0gMDtcblxuXHRcdHRoaXMuZ2FtZS50aW1lLmV2ZW50cy5yZXBlYXQoUGhhc2VyLlRpbWVyLlNFQ09ORCwgdGhpcy5jb25maWcuaW50cm8uZHVyYXRpb25QZXJMaW5lLCB0aGlzLmFkZE5leHRTZW50ZW5jZSwgdGhpcyk7XG5cdFx0dGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzLnN0YXJ0VGV4dCkudG8oe2FscGhhOiAxfSwgdGhpcy5jb25maWcuY29udGludWUuZHVyYXRpb24sIFBoYXNlci5FYXNpbmcuUXVhZHJhdGljLkluT3V0LCB0cnVlLCB0aGlzLmNvbmZpZy5jb250aW51ZS5kZWxheSk7XG5cdFx0dGhpcy5nYW1lLnRpbWUuZXZlbnRzLmFkZCh0aGlzLmNvbmZpZy5jb250aW51ZS5kZWxheSwgdGhpcy5lbmFibGVXYXJwTW9kZSwgdGhpcyk7XG5cdFx0dGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLm9uRG93bkNhbGxiYWNrID0gdGhpcy5lbnRlclBsYXkuYmluZCh0aGlzKTtcblx0XHR0aGlzLmdhbWUuc2NhbGUuZnVsbFNjcmVlblNjYWxlTW9kZSA9IFBoYXNlci5TY2FsZU1hbmFnZXIuRVhBQ1RfRklUO1xuXHRcdHRoaXMuZ2FtZS5pbnB1dC5vbkRvd24uYWRkKHRoaXMuZnVsbHNjcmVlbiwgdGhpcyk7XG5cdH1cblxuXHRmdWxsc2NyZWVuKCkge1xuXHRcdHRoaXMuZ2FtZS5zY2FsZS5pc0Z1bGxTY3JlZW4/IHRoaXMuZ2FtZS5zY2FsZS5zdG9wRnVsbFNjcmVlbigpIDogdGhpcy5nYW1lLnNjYWxlLnN0YXJ0RnVsbFNjcmVlbihmYWxzZSlcblx0fVxuXG5cdGVuYWJsZVdhcnBNb2RlKCl7XG5cdFx0dGhpcy53YXJwTW9kZSA9IHRydWU7XG5cdFx0dGhpcy5nYW1lLnRpbWUuZXZlbnRzLnJlcGVhdChQaGFzZXIuVGltZXIuU0VDT05ELCAyMCwgZnVuY3Rpb24oKXtcblx0XHRcdHRoaXMuZ2VuZXJhdGVQb2ludHMoKVxuXHRcdH0uYmluZCh0aGlzKSwgdGhpcyk7XG5cdH1cblxuXHRlbnRlclBsYXkoKXtcblx0XHR0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQub25Eb3duQ2FsbGJhY2sgPSBudWxsO1xuXHRcdHRoaXMuZ2FtZS5zdGF0ZS5zdGFydCgncGxheScpXG5cdH1cblxuXHRhZGROZXh0U2VudGVuY2UoKSB7XG5cdFx0aWYodGhpcy5jdXJyZW50U2VudGVuY2VJbmRleCA8IHRoaXMuc2VudGVuY2VzLmxlbmd0aCkgdGhpcy5pbnRyb1RleHQudGV4dCArPSB0aGlzLnNlbnRlbmNlc1t0aGlzLmN1cnJlbnRTZW50ZW5jZUluZGV4KytdICsgXCJcXG5cIjtcblx0fVxuXG5cdGdlbmVyYXRlUG9pbnRzKCl7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbmZpZy5zdGFyLm1heDsgaSsrKSB7XG5cdFx0XHR0aGlzLnBvaW50cy5wdXNoKHtcblx0XHRcdFx0eDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5nYW1lLndvcmxkLndpZHRoKSAtIHRoaXMuZ2FtZS53b3JsZC53aWR0aC8yLFxuXHRcdFx0XHR5OiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmdhbWUud29ybGQuaGVpZ2h0KSAtIHRoaXMuZ2FtZS53b3JsZC5oZWlnaHQvMixcblx0XHRcdFx0ejogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTcwMCkgLSAxMDBcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdGRyYXdTdGFycygpe1xuXHRcdGxldCBzdGFyRGlzdGFuY2UgPSB0aGlzLmNvbmZpZy5zdGFyLmRpc3RhbmNlO1xuXHRcdHRoaXMucG9pbnRzLmZvckVhY2goZnVuY3Rpb24ocG9pbnQpe1xuXHRcdFx0bGV0IHBlcnNwZWN0aXZlID0gc3RhckRpc3RhbmNlIC8gKHN0YXJEaXN0YW5jZSAtIHBvaW50LnopLFxuXHRcdFx0XHR4ID0gdGhpcy5nYW1lLndvcmxkLmNlbnRlclggKyBwb2ludC54ICogcGVyc3BlY3RpdmUsXG5cdFx0XHRcdHkgPSB0aGlzLmdhbWUud29ybGQuY2VudGVyWSArIHBvaW50LnkgKiBwZXJzcGVjdGl2ZTtcblxuXHRcdFx0cG9pbnQueiArPSB0aGlzLmNvbmZpZy5zdGFyLnNwZWVkO1xuXG5cdFx0XHRpZiAocG9pbnQueiA+IDIwMCkgcG9pbnQueiAtPSA2MDA7XG5cdFx0XHR0aGlzLnN0YXJzVGV4dHVyZS5yZW5kZXJYWSh0aGlzLnN0YXJUZXh0dXJlLCB4LCB5KTtcblx0XHR9LmJpbmQodGhpcykpO1xuXHR9XG5cblx0cmVkcmF3U3RhcnMoKXtcblx0XHR0aGlzLnN0YXJzVGV4dHVyZS5jbGVhcigpO1xuXHRcdHRoaXMuZHJhd1N0YXJzKCk7XG5cdH1cblxuXHR1cGRhdGUoKSB7XG5cdFx0aWYodGhpcy53YXJwTW9kZSkge1xuXHRcdFx0dGhpcy5kcmF3U3RhcnMoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5yZWRyYXdTdGFycygpXG5cdFx0fVxuXHR9XG5cblx0c2h1dGRvd24oKSB7XG5cdFx0dGhpcy5zZnguZGVzdHJveSgpXG5cdH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5IHtcclxuICBwcmVsb2FkKCkge1xyXG4gICAgdGhpcy5nYW1lLmxvYWQuYXVkaW8oJ2NhbnRpbmEtc29uZycsICdhc3NldHMvc29uZ3MvY2FudGluYS1zb25nLm9nZycpO1xyXG4gICAgdGhpcy5nYW1lLmxvYWQuaW1hZ2UodGhpcy5jb25maWcueFdpbmcubmFtZSwgdGhpcy5jb25maWcueFdpbmcucGF0aCk7XHJcbiAgICB0aGlzLmdhbWUubG9hZC5pbWFnZSgndGlueXN0YXInLCAnYXNzZXRzL3Nwcml0ZXMvc3RhcjIucG5nJyk7XHJcblxyXG4gICAgZm9yKGxldCBpPTA7IGkgPCB0aGlzLmNvbmZpZy5zaGlwLm51bWJlcjsgaSsrKXtcclxuICAgICAgdGhpcy5nYW1lLmxvYWQuaW1hZ2UoYHNoaXAtJHtpfWAsIGBhc3NldHMvc3ByaXRlcy8ke2l9LnBuZ2ApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaW5pdCgpe1xyXG4gICAgdGhpcy5jb25maWcgPSB7XHJcbiAgICAgICAgeFdpbmc6IHtcclxuICAgICAgICAgIG5hbWU6ICd4LXdpbmcnLFxyXG4gICAgICAgICAgcGF0aDogJ2Fzc2V0cy9zcHJpdGVzL3gtd2luZy5wbmcnLFxyXG4gICAgICAgICAgd2lkdGg6IDIyMixcclxuICAgICAgICAgIGhlaWdodDogMjUwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdGFyOntcclxuICAgICAgICAgIGRpc3RhbmNlOiAxMCxcclxuICAgICAgICAgIG1heDogMTAwLFxyXG4gICAgICAgICAgc3BlZWQ6IDEwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzaGlwOntcclxuICAgICAgICAgIHNjYWxlUmF0aW86IDAuNSxcclxuICAgICAgICAgIHNwYXduUmF0ZTogMC4wMSxcclxuICAgICAgICAgIG51bWJlcjogNDVcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICB0aGlzLnN0YXJzID0gW107XHJcbiAgICB0aGlzLnBvaW50cyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlKCkge1xyXG4gICAgdGhpcy5hbGl2ZSA9IHRydWU7XHJcbiAgICB0aGlzLnNjb3JlID0gMDtcclxuXHJcbiAgICB0aGlzLnNmeCA9IHRoaXMuZ2FtZS5hZGQuYXVkaW8oJ2NhbnRpbmEtc29uZycpO1xyXG4gICAgdGhpcy5zZngucGxheSgpO1xyXG5cclxuICAgIHRoaXMuc3RhcnNUZXh0dXJlID0gdGhpcy5nYW1lLmFkZC5yZW5kZXJUZXh0dXJlKHRoaXMuZ2FtZS53b3JsZC53aWR0aCwgdGhpcy5nYW1lLndvcmxkLmhlaWdodCwgJ3RleHR1cmUnKTtcclxuICAgIHRoaXMuc3RhclRleHR1cmUgPSB0aGlzLmdhbWUubWFrZS5zcHJpdGUoMCwgMCwgJ3RpbnlzdGFyJyk7XHJcbiAgICB0aGlzLmdhbWUuYWRkLnNwcml0ZSgwLCAwLCB0aGlzLnN0YXJzVGV4dHVyZSk7XHJcblxyXG4gICAgdGhpcy5wbGF5ZXJTaGlwID0gdGhpcy5nYW1lLmFkZC5zcHJpdGUodGhpcy5nYW1lLndvcmxkLmNlbnRlclggLSB0aGlzLmNvbmZpZy54V2luZy53aWR0aCAvIDQsIHRoaXMuZ2FtZS53b3JsZC5oZWlnaHQgLSAyMDAsICd4LXdpbmcnKTtcclxuICAgIHRoaXMucGxheWVyU2hpcC5zY2FsZS5zZXRUbyh0aGlzLmNvbmZpZy5zaGlwLnNjYWxlUmF0aW8sIHRoaXMuY29uZmlnLnNoaXAuc2NhbGVSYXRpbyk7XHJcblxyXG4gICAgdGhpcy5vYnN0YWNsZXMgPSB0aGlzLmdhbWUuYWRkLmdyb3VwKCk7XHJcbiAgICB0aGlzLm9ic3RhY2xlcy5lbmFibGVCb2R5ID0gdHJ1ZTtcclxuICAgIHRoaXMub2JzdGFjbGVzLnBoeXNpY3NCb2R5VHlwZSA9IFBoYXNlci5QaHlzaWNzLkFSQ0FERTtcclxuXHJcbiAgICB0aGlzLmdlbmVyYXRlTmV3RW5lbWllcygpO1xyXG4gICAgdGhpcy5nZW5lcmF0ZVBvaW50cygpO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5waHlzaWNzLmVuYWJsZSh0aGlzLnBsYXllclNoaXAsIFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XHJcbiAgICB0aGlzLnBsYXllclNoaXAuYm9keS5zZXRTaXplKHRoaXMuY29uZmlnLnhXaW5nLndpZHRoLCB0aGlzLmNvbmZpZy54V2luZy5oZWlnaHQpO1xyXG4gICAgdGhpcy5jdXJzb3JzID0gdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLmNyZWF0ZUN1cnNvcktleXMoKTtcclxuXHJcbiAgICB0aGlzLmdhbWUuYWRkLnRleHQoMTYsIDE2LCAnQXJyb3dzIHRvIG1vdmUnLCB7IGZvbnQ6ICcxNHB4IEFyaWFsJywgZmlsbDogJyNmZmZmZmYnIH0pO1xyXG4gICAgdGhpcy5zY29yZVRleHQgPSB0aGlzLmdhbWUuYWRkLnRleHQodGhpcy5nYW1lLndvcmxkLmNlbnRlclggLSB0aGlzLnNjb3JlLnRvU3RyaW5nKCkubGVuZ3RoICogMjAsIDE2LCAnJywgeyBmb250OiAnMTRweCBBcmlhbCcsIGZpbGw6ICcjZmZmZmZmJyB9KTtcclxuXHJcbiAgICB0aGlzLmdhbWUudGltZS5ldmVudHMucmVwZWF0KFBoYXNlci5UaW1lci5TRUNPTkQsIDEwMCwgdGhpcy5nZW5lcmF0ZU5ld0VuZW1pZXMsIHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgLypcclxuICByZW5kZXIoKXtcclxuICAgIHRoaXMub2JzdGFjbGVzLmZvckVhY2hBbGl2ZSh0aGlzLmRlYnVnLCB0aGlzKTtcclxuICB9XHJcblxyXG4gIGRlYnVnKG1lbWJlcil7XHJcbiAgICB0aGlzLmdhbWUuZGVidWcuYm9keShtZW1iZXIpO1xyXG4gIH1cclxuICAqL1xyXG5cclxuICB1cGRhdGUoKSB7XHJcbiAgICBpZih0aGlzLmFsaXZlKXtcclxuICAgICAgdGhpcy5yZWRyYXdTdGFycygpO1xyXG4gICAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZSh0aGlzLnBsYXllclNoaXAsIHRoaXMub2JzdGFjbGVzLCB0aGlzLmNvbGxpc2lvbkhhbmRsZXIsIG51bGwsIHRoaXMpO1xyXG4gICAgICB0aGlzLnBsYXllclNoaXAuYm9keS5jb2xsaWRlV29ybGRCb3VuZHMgPSB0cnVlO1xyXG4gICAgICB0aGlzLnBsYXllclNoaXAuYm9keS52ZWxvY2l0eS5zZXQoMCk7XHJcbiAgICAgIHN3aXRjaCh0cnVlKXtcclxuICAgICAgICBjYXNlIHRoaXMuY3Vyc29ycy5sZWZ0LmlzRG93bjpcclxuICAgICAgICAgIHRoaXMucGxheWVyU2hpcC5ib2R5LnZlbG9jaXR5LnggPSAtMTAwMDtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgdGhpcy5jdXJzb3JzLnJpZ2h0LmlzRG93bjpcclxuICAgICAgICAgIHRoaXMucGxheWVyU2hpcC5ib2R5LnZlbG9jaXR5LnggPSAxMDAwO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSB0aGlzLmN1cnNvcnMudXAuaXNEb3duOlxyXG4gICAgICAgICAgdGhpcy5wbGF5ZXJTaGlwLmJvZHkudmVsb2NpdHkueSA9IC0xMDAwO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSB0aGlzLmN1cnNvcnMuZG93bi5pc0Rvd246XHJcbiAgICAgICAgICB0aGlzLnBsYXllclNoaXAuYm9keS52ZWxvY2l0eS55ID0gMTAwMDtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnNjb3JlICs9IE1hdGgucm91bmQoKHRoaXMuZ2FtZS53b3JsZC5oZWlnaHQgLSB0aGlzLnBsYXllclNoaXAueSkgLyAyMDApO1xyXG4gICAgICB0aGlzLnNjb3JlVGV4dC50ZXh0ID0gYFNjb3JlIDogJHt0aGlzLnNjb3JlfWA7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb2xsaXNpb25IYW5kbGVyKCl7XHJcbiAgICB0aGlzLmFsaXZlID0gZmFsc2U7XHJcbiAgICB0aGlzLmdhbWUuc3RhdGUuc3RhcnQoJ2dhbWUtb3ZlcicsIHRydWUsIGZhbHNlLCB0aGlzLnNjb3JlKTtcclxuICB9XHJcblxyXG4gIGdlbmVyYXRlTmV3RW5lbWllcygpIHtcclxuICAgIGZvcihsZXQgaT0wOyBpIDwgdGhpcy5jb25maWcuc2hpcC5udW1iZXI7IGkrKyl7XHJcbiAgICAgIGlmKE1hdGgucmFuZG9tKCkgPCB0aGlzLmNvbmZpZy5zaGlwLnNwYXduUmF0ZSl7XHJcbiAgICAgICAgbGV0IGVuZW15ID0gdGhpcy5nYW1lLmFkZC5zcHJpdGUoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5nYW1lLndvcmxkLndpZHRoKSwgLU1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuZ2FtZS53b3JsZC5oZWlnaHQpLCBgc2hpcC0ke2l9YCk7XHJcbiAgICAgICAgZW5lbXkuc2NhbGUuc2V0VG8odGhpcy5jb25maWcuc2hpcC5zY2FsZVJhdGlvLCB0aGlzLmNvbmZpZy5zaGlwLnNjYWxlUmF0aW8pO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmVuYWJsZShlbmVteSwgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcclxuICAgICAgICBlbmVteS5ib2R5LnZlbG9jaXR5LnkgPSA3MDA7XHJcbiAgICAgICAgdGhpcy5vYnN0YWNsZXMuYWRkKGVuZW15KTtcclxuICAgICAgICB0aGlzLmNvbmZpZy5zaGlwLnNwYXduUmF0ZSArPSAwLjAwMTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2VuZXJhdGVQb2ludHMoKXtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb25maWcuc3Rhci5tYXg7IGkrKykge1xyXG4gICAgICB0aGlzLnBvaW50cy5wdXNoKHtcclxuICAgICAgICB4OiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmdhbWUud29ybGQud2lkdGgpLFxyXG4gICAgICAgIHk6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuZ2FtZS53b3JsZC5oZWlnaHQpXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZHJhd1N0YXJzKCl7XHJcbiAgICB0aGlzLnBvaW50cy5mb3JFYWNoKGZ1bmN0aW9uKHBvaW50KXtcclxuICAgICAgcG9pbnQueSArPSB0aGlzLmNvbmZpZy5zdGFyLmRpc3RhbmNlO1xyXG4gICAgICBpZiAocG9pbnQueSA+IHRoaXMuZ2FtZS53b3JsZC5oZWlnaHQpIHBvaW50LnkgPSAwO1xyXG4gICAgICB0aGlzLnN0YXJzVGV4dHVyZS5yZW5kZXJYWSh0aGlzLnN0YXJUZXh0dXJlLCBwb2ludC54LCBwb2ludC55KTtcclxuICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgfVxyXG5cclxuICByZWRyYXdTdGFycygpe1xyXG4gICAgdGhpcy5zdGFyc1RleHR1cmUuY2xlYXIoKTtcclxuICAgIHRoaXMuZHJhd1N0YXJzKCk7XHJcbiAgfVxyXG5cclxuICBzaHV0ZG93bigpe1xyXG4gICAgdGhpcy5zZnguZGVzdHJveSgpXHJcbiAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJlbG9hZCB7XG5cdHByZWxvYWQoKSB7XG5cblx0fVxuXG5cdGNyZWF0ZSgpIHtcblx0XHR0aGlzLmdhbWUuc3RhdGUuc3RhcnQoJ2ludHJvJyk7XG5cdH1cbn0iXX0=
