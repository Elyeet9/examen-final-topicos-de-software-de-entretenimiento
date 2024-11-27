import Phaser from "phaser";

class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }

    create() {
        this.initBackground();
        this.initPlayer();
    }

    initBackground() {
        this.bgGame = this.add.image(
            this.game.config.width / 2,
            this.game.config.height / 2,
            'bgGame'
        );
        this.bgGame.setOrigin(0.5, 0.5);
        this.bgGame.displayWidth = 800;
        this.bgGame.displayHeight = 600;
    }

    initPlayer() {
        this.player = this.physics.add.sprite(
            this.game.config.width / 2,
            this.game.config.height - 100,
            'player'
        );
        this.player.setOrigin(0.5, 0.5);
        this.player.setScale(0.3);
    }
}
export default GameScene;