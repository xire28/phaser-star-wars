export default class GameOver {
  preload(){
    this.game.load.audio('imperial-march', 'assets/songs/imperial-march.ogg');
    this.game.load.image('blood', 'assets/sprites/blood.png');
  }

  init(score){
    this.score = score;
  }

  create() {
    this.sfx = this.game.add.audio('imperial-march');
    this.sfx.play();

    this.backgroundTexture = this.game.add.renderTexture(this.game.world.width, this.game.world.height, 'texture');
    this.bloodTexture = this.game.make.sprite(0, 0, 'blood');
    this.bloodTexture.anchor.setTo(0.5, 0.5)
    this.backgroundTexture.renderXY(this.bloodTexture, this.game.world.centerX, this.game.world.centerY);
    this.game.add.sprite(0, 0, this.backgroundTexture);

    //Render texts
    this.game.add.text(this.game.world.centerX - 140, this.game.world.centerY - 40, 'WASTED', { font: '62px Arial', fill: '#ffffff' });
    this.game.add.text(this.game.world.centerX - 50, this.game.world.centerY + 40, `${this.score} points`, { font: '16px Arial', fill: '#ffffff' });
    this.game.add.text(this.game.world.centerX - 90, this.game.world.centerY + 80, '[ press a key to restart ]', { font: '16px Arial', fill: '#ffffff' });
    this.game.input.keyboard.onDownCallback = this.enterPlay.bind(this);
  }

  enterPlay() {
    this.game.state.start('play');
  }

  shutdown() {
    this.game.input.keyboard.onDownCallback = null;
    this.sfx.destroy();
  }
}