import Phaser from "phaser";

class PreloadScene extends Phaser.Scene {
    constructor() {
        super("PreloadScene");
    }

    preload() {
        this.load.image('bgMenu', 'assets/Sample.png');
        this.load.image('bgGame', 'assets/bgGame.png');
        this.load.image('player', 'assets/PNG/Sprites/Rockets/spaceRockets_003.png');
        this.load.image('enemy1', 'assets/PNG/Sprites/Ships/spaceShips_004.png');
        this.load.image('enemy2', 'assets/PNG/Sprites/Ships/spaceShips_009.png');
        this.load.image('bullet', 'assets/PNG/Sprites/Missiles/spaceMissiles_021.png');
    }

    create() {
        this.scene.start('MenuScene');
    }
}
export default PreloadScene;