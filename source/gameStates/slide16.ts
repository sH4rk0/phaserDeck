/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>

module core {
    export class slide16 extends Phaser.State {

        private bg: Phaser.TileSprite;
        private isStarted:boolean;
        private startText:Phaser.Text;
        private flapKey: any;

        constructor() {

            super();

        }

        create() {

            this.isStarted=false;
            this.game.physics.arcade.gravity.y = 400;
            
            this.game.world.setBounds(0, 0, 10000, 768);
            this.game.camera.x = 0;

            this.bg = this.game.add.tileSprite(-100, 0, 1200, 768, 'bgGame');
            this.bg.fixedToCamera = true;

            this.startText=this.game.add.text(400, this.game.world.centerY, "space to start",{ font: '34px Arial', fill: '#fff' });

            if (isMobile(this.game)) {
                this.game.input.onDown.addOnce(this.startGame, this);
               
            } else {

                this.flapKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                this.flapKey.onDown.addOnce(this.startGame, this);
                this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
            }

        }


        startGame() {

            this.isStarted = true;
             this.startText.visible=false;

        }

        render() {

            this.game.debug.cameraInfo(this.game.camera, 32, 32);
            
        }


        update() {

            if (this.isStarted) {

                this.bg.tilePosition.x -= 1.5;
            
            }

        }



    }
}