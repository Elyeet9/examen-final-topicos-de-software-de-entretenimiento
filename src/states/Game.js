import Phaser from "phaser";

class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }

    init() {
        this.speed = 300.0;
    }

    create() {
        this.initBackground();
        this.initPlayer();
        this.initEnemies();
    }

    initBackground() {
        this.bgGame = this.add.image(
            this.game.config.width / 2,
            this.game.config.height / 2,
            'bgGame'
        );
        this.bgGame.setOrigin(0.5, 0.5);
    }

    initPlayer() {
        this.player = this.physics.add.sprite(
            this.game.config.width / 2,
            this.game.config.height - 100,
            'player'
        );
        this.player.setOrigin(0.5, 0.5);
        this.player.setScale(0.3);

        this.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    initEnemies() {
        this.enemies = this.physics.add.group();

        this.time.addEvent({
            delay: 1000, // TODO - CHANGE TO 4000
            callback: this.spawnEnemy,
            callbackScope: this,
            loop:true
        });
        
        // Add physics
    }

    update(time, delta) {
        this.player.setVelocity(0);
        this.player.setAngle(0);
        
        if(this.A.isDown) {
            this.player.body.setVelocityX(-this.speed);
            this.player.setAngle(-20);
        }
        if(this.D.isDown) {
            this.player.body.setVelocityX(this.speed);
            this.player.setAngle(20);
        }
    }

    spawnEnemy() {
        let x = Phaser.Math.Between(50, this.game.config.width - 50);
        const textures = ['enemy1', 'enemy2'];
        let texture = Phaser.Utils.Array.GetRandom(textures);
        let enemy = this.enemies.create(x, -50, texture);
        enemy.setVelocityY(this.speed / 2);
        enemy.setScale(0.5);
    }
}
export default GameScene;