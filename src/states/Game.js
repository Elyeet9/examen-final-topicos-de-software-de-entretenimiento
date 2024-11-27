import Phaser from "phaser";

class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }

    init() {
        this.speed = 300.0;
        this.hp = 3;
        this.score = 0;
    }

    create() {
        this.initUI();
        this.initPlayer();
        this.initEnemies();
        this.initBullets();
    }

    initUI() {
        // Background
        this.bgGame = this.add.image(
            this.game.config.width / 2,
            this.game.config.height / 2,
            'bgGame'
        );
        this.bgGame.setOrigin(0.5, 0.5);

        // Health Label
        this.lblHp = this.add.text(
            10, 10, 
            `HP: ${this.hp}`,
            {
                font: '24px Arial',
                color: '#ffffff',
                fontStyle: 'bold'
            }
        )

        // Score Label
        this.lblScore = this.add.text(
            this.game.config.width - 10, 10,
            `Score: ${this.score}`,
            {
                font: '24px Arial',
                color: '#ffffff',
                fontStyle: 'bold',
                align: 'right'
            }
        )
        this.lblScore.setOrigin(1, 0);
    }

    initPlayer() {
        this.player = this.physics.add.sprite(
            this.game.config.width / 2,
            this.game.config.height - 100,
            'player'
        );
        this.player.setOrigin(0.5, 0.5);
        this.player.setScale(0.3);

        this.A = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.A
        );
        this.D = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.D
        );
    }

    initEnemies() {
        this.enemies = this.physics.add.group();

        this.time.addEvent({
            delay: 1000, // TODO - CHANGE TO 4000
            callback: this.spawnEnemy,
            callbackScope: this,
            loop:true
        });
        
        this.physics.add.overlap(
            this.player, this.enemies, 
            this.handleCollision, 
            null, this
        );
    }

    initBullets() {
        this.bullets = this.physics.add.group();

        // test
        this.time.addEvent({
            delay: 1000, // TODO - CHANGE TO 4000
            callback: this.spawnBullet,
            callbackScope: this,
            loop:true
        });

        this.physics.add.overlap(
            this.bullets, this.enemies, 
            this.bulletCollision, 
            null, this
        );
    }

    handleCollision(player, enemy) {
        enemy.destroy();
        this.hp--;
        this.lblHp.setText(`HP: ${this.hp}`);

        if(this.hp <= 0) {
            this.gameOver();
        }
    }

    bulletCollision(bullet, enemy) {
        if(enemy.texture.key == 'enemy1') {
            this.score += 10;
        } else if(enemy.texture.key == 'enemy2') {
            this.score += 5;
        }
        this.lblScore.setText(`Score: ${this.score}`);
        bullet.destroy();
        enemy.destroy();
    } 

    update(time, delta) {
        // Player
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

        // Enemy and Bullet
        this.checkOutOfBounds();
    }

    spawnEnemy() {
        let x = Phaser.Math.Between(50, this.game.config.width - 50);
        const textures = ['enemy1', 'enemy2'];
        let texture = Phaser.Utils.Array.GetRandom(textures);
        let enemy = this.enemies.create(x, -50, texture);
        enemy.setVelocityY(this.speed / 2);
        enemy.setScale(0.5);
    }

    spawnBullet() {
        let x = this.player.x;
        let y = this.player.y - 20;
        let bullet = this.bullets.create(x, y, 'bullet');
        bullet.setVelocityY(-this.speed);
        bullet.setScale(0.5);
    }

    checkOutOfBounds() {
        this.enemies.children.each((enemy) => {
            if (enemy.y > this.game.config.height + 50) {
                enemy.destroy();
            }
        });
        this.bullets.children.each((bullet) => {
            if(bullet.y < -50) {
                bullet.destroy();
            }
        })
    }

    gameOver() {
        this.enemies.clear(true, true);
        this.bullets.clear(true, true);

        this.scene.start(
            'GameOverScene', 
            { score: this.score }
        );
    }
}
export default GameScene;