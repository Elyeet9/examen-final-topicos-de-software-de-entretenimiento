import Phaser from "phaser";

class PreloadScene extends Phaser.Scene {
    constructor() {
        super("PreloadScene");
    }

    preload() {
        this.load.image('bgMenu', 'assets/Sample.png');
    }

    create() {
        this.scene.start('MenuScene');
    }
}
export default PreloadScene;