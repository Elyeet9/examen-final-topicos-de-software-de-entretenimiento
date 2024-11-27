import Phaser from "phaser";

class MenuScene extends Phaser.Scene {
    constructor() {
        super("MenuScene");
    }

    create() {
        this.bgMenu = this.add.image(
            this.game.config.width / 2, 
            this.game.config.height / 2, 
            'bgMenu'
        );
        this.bgMenu.setOrigin(0.5, 0.5);

        this.text = this.add.text(
            this.game.config.width / 2, 
            this.game.config.height / 2, 
            'Welcome Gaa!', 
            {
                font: '64px Arial',
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 8
            }
        );
        this.text.setOrigin(0.5, 0.5);

        this.input.once('pointerdown', () => {
            this.scene.start('GameScene');
        });
    }
}
export default MenuScene;