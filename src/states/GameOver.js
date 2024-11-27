import Phaser from "phaser";

class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

    init(data) {
        this.finalScore = data.score;
    }

    create() {
        // Background
        this.bgGame = this.add.image(
            this.game.config.width / 2,
            this.game.config.height / 2,
            'bgGame'
        );
        this.bgGame.setOrigin(0.5, 0.5);

        // Game Over text
        this.text = this.add.text(
            this.game.config.width / 2, 
            this.game.config.height / 2 - 25, 
            'Game Over', 
            {
                font: '64px Arial',
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 8,
                align: 'center'
            }
        );
        this.text.setOrigin(0.5, 0.5);

        // Score text
        this.score = this.add.text(
            this.game.config.width / 2, 
            this.game.config.height / 2 + 25, 
            `Score: ${this.finalScore}`, 
            {
                font: '24px Arial',
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 4,
                align: 'center'
            }
        );
        this.score.setOrigin(0.5, 0.5);
    }
}
export default GameOverScene;