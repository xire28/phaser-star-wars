export default class Intro {
	
	preload() {
		this.game.load.image('tinystar', 'assets/sprites/star2.png');
		this.game.load.audio('main-title', 'assets/songs/main-title.ogg');
		this.game.load.bitmapFont('gem', 'assets/fonts/bitmapFonts/gem.png', 'assets/fonts/bitmapFonts/gem.xml');
	}

	init() {
		this.config = {
			font: {
				name: 'gem',
				size: 22,
				width: 5.5
			},
			star:{
				distance: 300,
				max: 100,
				speed: 10
			},
			intro: {
				content: "La République Galactique est en pleine ébullition. La taxation des routes commerciales reliant les systèmes éloignés provoque la discorde.\n" +
					"\n" +
				"Pour régler la question, la cupide Fédération du Commerce et ses redoutables vaisseaux de guerre imposent un blocus à la petite planète Naboo.\n" +
				"\n" +
				"le Chancelier Suprême charge en secret deux Chevaliers Jedi, gardiens de la paix et de la justice dans la galaxie, de résoudre le conflit...",
				durationPerLine: 200
			},
			continue: {
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

	create() {
		this.game.stage.backgroundColor = 0x272822;

		this.starsTexture = this.game.add.renderTexture(this.game.world.width, this.game.world.height, 'texture');
		this.starTexture = this.game.make.sprite(0, 0, 'tinystar');
		this.sfx = this.game.add.audio('main-title');

		this.sfx.play();

		this.generatePoints();
		this.game.add.sprite(0, 0, this.starsTexture);
		this.introText = this.game.add.bitmapText(
			this.game.world.width / 2 - this.config.font.width * this.sentences[0].length,
			this.game.world.height / 2 - this.config.font.size * this.sentences.length,
			this.config.font.name,
			'',
			this.config.font.size
		);

		this.startText = this.game.add.bitmapText(
			this.game.world.width / 2 - this.config.font.width * this.config.continue.content.length,
			this.game.world.height / 2 + this.config.font.size * this.sentences.length,
			this.config.font.name,
			this.config.continue.content,
			this.config.font.size
		);
		this.startText.alpha = 0;

		this.game.time.events.repeat(Phaser.Timer.SECOND, this.config.intro.durationPerLine, this.addNextSentence, this);
		this.game.add.tween(this.startText).to({alpha: 1}, this.config.continue.duration, Phaser.Easing.Quadratic.InOut, true, this.config.continue.delay);
		this.game.time.events.add(this.config.continue.delay, this.enableWarpMode, this);
		this.game.input.keyboard.onDownCallback = this.enterPlay.bind(this);
		this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
		this.game.input.onDown.add(this.fullscreen, this);
	}

	fullscreen() {
		this.game.scale.isFullScreen? this.game.scale.stopFullScreen() : this.game.scale.startFullScreen(false)
	}

	enableWarpMode(){
		this.warpMode = true;
		this.game.time.events.repeat(Phaser.Timer.SECOND, 20, function(){
			this.generatePoints()
		}.bind(this), this);
	}

	enterPlay(){
		this.game.input.keyboard.onDownCallback = null;
		this.game.state.start('play')
	}

	addNextSentence() {
		if(this.currentSentenceIndex < this.sentences.length) this.introText.text += this.sentences[this.currentSentenceIndex++] + "\n";
	}

	generatePoints(){
		for (let i = 0; i < this.config.star.max; i++) {
			this.points.push({
				x: Math.floor(Math.random() * this.game.world.width) - this.game.world.width/2,
				y: Math.floor(Math.random() * this.game.world.height) - this.game.world.height/2,
				z: Math.floor(Math.random() * 1700) - 100
			});
		}
	}

	drawStars(){
		let starDistance = this.config.star.distance;
		this.points.forEach(function(point){
			let perspective = starDistance / (starDistance - point.z),
				x = this.game.world.centerX + point.x * perspective,
				y = this.game.world.centerY + point.y * perspective;

			point.z += this.config.star.speed;

			if (point.z > 200) point.z -= 600;
			this.starsTexture.renderXY(this.starTexture, x, y);
		}.bind(this));
	}

	redrawStars(){
		this.starsTexture.clear();
		this.drawStars();
	}

	update() {
		if(this.warpMode) {
			this.drawStars();
		} else {
			this.redrawStars()
		}
	}

	shutdown() {
		this.sfx.destroy()
	}
}