export default class Boot {
	preload() {

	}

	create() {
		this.game.state.start('preload');
	}
}