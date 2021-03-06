/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>

module core {
    export class slide28 extends Phaser.State {

        private player: Phaser.Sprite;
        private aliens: Phaser.Group;
        private bullets: Phaser.Group;
        private bulletTime: number;
        private cursors: any;
        private leftButton: any;
        private rightButton: any;
        private fireButton: any;
        private explosions: Phaser.Group;
        private starfield: Phaser.TileSprite;
        private score: number;
        private scoreString: string;
        private scoreText: Phaser.Text;
        private lives: Phaser.Group;
        private enemyBullet;
        private enemyBullets: Phaser.Group;
        private firingTimer: number;
        private stateText: Phaser.Text;
        private livingEnemies: Array<Phaser.Sprite>;

        constructor() {

            super();

        }

        init() { }

        preload() {

           
         

        }

        create() {
             this.game.world.setBounds(0, 0, 1024, 768);
            this.bulletTime = 0;
            this.score = 0;
            this.scoreString = '';
            this.firingTimer = 0;
            this.livingEnemies = [];

            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            //  The scrolling starfield background
            this.starfield = this.game.add.tileSprite(0, 0, 1024, 768, 'starfield');

            //  Our bullet group
            this.bullets = this.game.add.group();
            this.bullets.enableBody = true;
            this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
            this.bullets.createMultiple(30, 'bullet');
            this.bullets.setAll('anchor.x', 0.5);
            this.bullets.setAll('anchor.y', 1);
            this.bullets.setAll('outOfBoundsKill', true);
            this.bullets.setAll('checkWorldBounds', true);

            // The enemy's bullets
            this.enemyBullets = this.game.add.group();
            this.enemyBullets.enableBody = true;
            this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
            this.enemyBullets.createMultiple(30, 'enemyBullet');
            this.enemyBullets.setAll('anchor.x', 0.5);
            this.enemyBullets.setAll('anchor.y', 1);
            this.enemyBullets.setAll('outOfBoundsKill', true);
            this.enemyBullets.setAll('checkWorldBounds', true);

            //  The hero!
            this.player = this.game.add.sprite(512, 700, 'ship');
            this.player.anchor.setTo(0.5, 0.5);
            this.game.physics.enable(this.player, Phaser.Physics.ARCADE);

            //  The baddies!
            this.aliens = this.game.add.group();
            this.aliens.enableBody = true;
            this.aliens.physicsBodyType = Phaser.Physics.ARCADE;

            this.createAliens();

            //  The score
            this.scoreString = 'Score : ';
            this.scoreText = this.game.add.text(10, 10, this.scoreString + this.score, { font: '34px Arial', fill: '#fff' });

            //  Lives
            this.lives = this.game.add.group();
            this.game.add.text(this.game.world.width - 100, 10, 'Lives : ', { font: '34px Arial', fill: '#fff' });

            //  Text
            this.stateText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, ' ', { font: '84px Arial', fill: '#fff' });
            this.stateText.anchor.setTo(0.5, 0.5);
            this.stateText.visible = false;

            for (var i = 0; i < 1; i++) {
                let ship = this.lives.create(this.game.world.width - 100 + (30 * i), 60, 'ship');
                ship.anchor.setTo(0.5, 0.5);
                ship.angle = 90;
                ship.alpha = 0.4;
            }

            //  An explosion pool
            this.explosions = this.game.add.group();
            this.explosions.createMultiple(30, 'kaboom');
            this.explosions.forEach(this.setupInvader, this);

            //  And some controls to play the game with
            this.cursors = this.game.input.keyboard.createCursorKeys();
            this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.M);
            this.leftButton = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
            this.rightButton = this.game.input.keyboard.addKey(Phaser.Keyboard.X);


        }

        createAliens() {

            for (var y = 0; y < 5; y++) {
                for (var x = 0; x < 16; x++) {
                    var alien = this.aliens.create(x * 48, y * 50, 'invader');
                    alien.anchor.setTo(0.5, 0.5);
                    alien.animations.add('fly', [0, 1, 2, 3], 20, true);
                    alien.play('fly');
                    alien.body.moves = false;
                }
            }

            this.aliens.x = 100;
            this.aliens.y = 80;

            //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
            let tween = this.game.add.tween(this.aliens).to({ x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

            //  When the tween loops it calls descend
            tween.onLoop.add(this.descend, this);
        }

        descend() {

            this.aliens.y += 10;

        }

        setupInvader(invader: Phaser.Sprite) {

            invader.anchor.x = 0.5;
            invader.anchor.y = 0.5;
            invader.animations.add('kaboom');

        }

        update() {


            //  Scroll the background
            this.starfield.tilePosition.y += 2;

            if (this.player.alive) {
                //  Reset the player, then check for movement keys
                this.player.body.velocity.setTo(0, 0);

                if (this.leftButton.isDown) {
                    this.player.body.velocity.x = -200;
                }
                else if (this.rightButton.isDown) {
                    this.player.body.velocity.x = 200;
                }

                //  Firing?
                if (this.fireButton.isDown) {
                    this.fireBullet();
                }

                if (this.game.time.now > this.firingTimer) {
                    this.enemyFires();
                }

                //  Run collision
                this.game.physics.arcade.overlap(this.bullets, this.aliens, this.collisionHandler, null, this);
                this.game.physics.arcade.overlap(this.enemyBullets, this.player, this.enemyHitsPlayer, null, this);
            }


        }



        collisionHandler(bullet: Phaser.Sprite, alien: Phaser.Sprite) {

            //  When a bullet hits an alien we kill them both
            bullet.kill();
            alien.kill();

            //  Increase the score
            this.score += 20;
            this.scoreText.text = this.scoreString + this.score;

            //  And create an explosion :)
            var explosion = this.explosions.getFirstExists(false);
            explosion.reset(alien.body.x, alien.body.y);
            explosion.play('kaboom', 30, false, true);

            if (this.aliens.countLiving() == 0) {
                this.score += 1000;
                this.scoreText.text = this.scoreString + this.score;

                this.enemyBullets.callAll('kill', this);
                this.stateText.text = " You Won, \n Click to restart";
                this.stateText.visible = true;

                //the "click to restart" handler
                //this.game.input.onTap.addOnce(this.restart, this);
            }

        }

        enemyHitsPlayer(player: Phaser.Sprite, bullet: Phaser.Sprite) {

            bullet.kill();

            let live = this.lives.getFirstAlive();

            if (live) {
                live.kill();
            }

            //  And create an explosion :)
            let explosion = this.explosions.getFirstExists(false);
            explosion.reset(player.body.x, player.body.y);
            explosion.play('kaboom', 30, false, true);

            // When the player dies
            if (this.lives.countLiving() < 1) {
                player.kill();
                this.enemyBullets.callAll('kill', this);

                this.stateText.text = "GAME OVER";
                this.stateText.visible = true;

                //the "click to restart" handler
                //this.game.input.onTap.addOnce(this.restart, this);
            }

        }

        enemyFires() {

            //  Grab the first bullet we can from the pool
            this.enemyBullet = this.enemyBullets.getFirstExists(false);

            this.livingEnemies.length = 0;

            this.aliens.forEachAlive((alien: Phaser.Sprite) => {

                // put every living enemy in an array
                this.livingEnemies.push(alien);
            }, this);


            if (this.enemyBullet && this.livingEnemies.length > 0) {

                var random = this.game.rnd.integerInRange(0, this.livingEnemies.length - 1);

                // randomly select one of them
                var shooter = this.livingEnemies[random];
                // And fire the bullet from this enemy
                this.enemyBullet.reset(shooter.body.x, shooter.body.y);

                this.game.physics.arcade.moveToObject(this.enemyBullet, this.player, 1000);
                this.firingTimer = this.game.time.now + 2000;
            }

        }

        fireBullet() {

            //  To avoid them being allowed to fire too fast we set a time limit
            if (this.game.time.now > this.bulletTime) {
                //  Grab the first bullet we can from the pool
                let bullet = this.bullets.getFirstExists(false);

                if (bullet) {
                    //  And fire it
                    bullet.reset(this.player.x, this.player.y + 8);
                    bullet.body.velocity.y = -400;
                    this.bulletTime = this.game.time.now + 200;
                }
            }

        }

        resetBullet(bullet: Phaser.Sprite) {

            //  Called if the bullet goes out of the screen
            bullet.kill();

        }

        restart() {

            //  A new level starts

            //resets the life count
            this.lives.callAll('revive', this);
            //  And brings the aliens back from the dead :)
            this.aliens.removeAll();
            this.createAliens();

            //revives the player
            this.player.revive();
            //hides the text
            this.stateText.visible = false;

        }

    }
}