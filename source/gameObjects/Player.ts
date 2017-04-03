/// <reference path="../Lib/phaser.d.ts"/>

module core {

    export class Player extends Phaser.Sprite {

        game: Phaser.Game;
        gameState: any;

        constructor(game: Phaser.Game, gameState: any) {

            super(game, 50, game.world.centerY, game.cache.getBitmapData('player'));

            this.gameState = gameState;
            this.game.physics.arcade.enableBody(this);
            this.scale.set(.5);
            this.anchor.setTo(0.5, 0.5);
            this.alive = false;
            this.body.allowGravity = false;
            this.body.collideWorldBounds = true;
            this.game.add.existing(this);

        }

        update() {

            if (this.angle < 40 && this.alive) {
                this.angle += 0.5;
            }

            if (!this.alive) {
                this.body.velocity.x = 0;
            }


        }


        flap() {

            if (!!this.alive) {
                
                this.body.velocity.y = -200;
                this.game.add.tween(this).to({ angle: -40 }, 100).start();

            }
        };



    }

}