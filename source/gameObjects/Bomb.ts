/// <reference path="../Lib/phaser.d.ts"/>


module core {

    export class Bomb extends Phaser.Sprite {

        game: Phaser.Game;
        gameState: any;
        private range: any;
        private vel: number;
    
        constructor(game: Phaser.Game, gameState: any, range?: any) {

            super(game, game.camera.x + 1024 + 100, 0, game.cache.getBitmapData('enemy'));

            this.game = game;
            this.gameState = gameState;
            this.name="bomb";
            this.game.physics.arcade.enable(this);
            this.body.immovable = false;
            this.body.allowGravity = false;
            this.scale.set(1);
            this.anchor.set(.5, .5)
            this.range = range;

            if (this.range == null) { this.y = this.game.rnd.integerInRange(100, 500); } else {
                this.y = this.game.rnd.integerInRange(this.range.start, this.range.end);
            }

            this.vel=game.rnd.realInRange(2,4);
            game.add.existing(this);

        }


        update() {

            this.x -= this.vel;
            this.angle -=this.vel;
            if (this.x < this.game.camera.x - 100) {  this.removeEnemy()  }

        }
        
        removeEnemy() {

            this.kill();
            this.destroy();

        }



    }
}