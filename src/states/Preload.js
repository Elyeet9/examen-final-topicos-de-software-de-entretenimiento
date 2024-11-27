import Phaser from "phaser";

class PreloadScene extends Phaser.Scene {
    constructor() {
        super("PreloadScene");
    }

    preload() {
        this.load.image('bgMenu', 'assets/Sample.png');
        this.load.image('bgGame', 'assets/bgGame.jpg');
        this.load.image('player', 'assets/PNG/Sprites/Rockets/spaceRockets_003.png');
    }

    create() {
        this.scene.start('MenuScene');
    }
}
export default PreloadScene;