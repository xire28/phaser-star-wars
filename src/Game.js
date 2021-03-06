// Create game (100% width, 100% height)
let game = new Phaser.Game('100', '100', Phaser.AUTO);

//Import states
import Boot from './Boot'
import Preload from './Preload'
import Intro from './Intro'
import Play from './Play'
import GameOver from './GameOver'

//Register states
game.state.add('boot', Boot);
game.state.add('preload', Preload);
game.state.add('intro', Intro);
game.state.add('play', Play);
game.state.add('game-over', GameOver);

// Start game
game.state.start('boot');