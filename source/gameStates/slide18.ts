/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>

module core {
    export class slide18 extends Phaser.State {

        private bg: Phaser.TileSprite;

        public player: Player;
        private flapKey: any;
        private idleTween: Phaser.Tween;
        private colliderTop: Phaser.Sprite;
        private colliderBottom: Phaser.Sprite;
        private colliderGroup: Phaser.Group;
        public playerGroup: Phaser.Group;
        private isStarted:boolean;
        private playerStart: number;


        constructor() {

            super();

        }

        preload() { }

        create() {
            
            this.isStarted=false;
            this.playerStart = null;
            this.game.physics.arcade.gravity.y = 400;
            this.game.world.setBounds(0, 0, 52000, 768);
            this.game.camera.x = 0;
    
          

            this.bg = this.game.add.tileSprite(-100, 0, 1200, 768, 'bgGame');
            this.bg.fixedToCamera = true;

            this.colliderGroup = this.game.add.group();

            this.player = new Player(this.game, this);
            this.player.play("idle");
            this.idleTween = this.game.add.tween(this.player).to({ y: this.player.y - 50 }, 1000, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);

            this.game.camera.follow(this.player);
            this.game.camera.deadzone = new Phaser.Rectangle(0, 0, 100, 768);

            if (isMobile(this.game)) {
                this.game.input.onDown.addOnce(this.startGame, this);
                this.game.input.onDown.add(this.player.flap, this.player);

            } else {

                this.flapKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                this.flapKey.onDown.addOnce(this.startGame, this);
                this.flapKey.onDown.add(this.player.flap, this.player);
                this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
            }



            this.colliderTop = this.game.add.sprite(0, 0, this.game.cache.getBitmapData('collider'));
            this.game.physics.arcade.enable(this.colliderTop);
            this.colliderTop.name = "colliderTop";
            this.colliderTop.body.immovable = true;
            this.colliderTop.fixedToCamera = true;
            this.colliderTop.visible = true;
            this.colliderTop.body.allowGravity = false;
            this.colliderGroup.add(this.colliderTop);

            this.colliderBottom = this.game.add.sprite(0, 748, this.game.cache.getBitmapData('collider'));
            this.game.physics.arcade.enable(this.colliderBottom);
            this.colliderBottom.name = "colliderBottom";
            this.colliderBottom.body.immovable = true;
            this.colliderBottom.fixedToCamera = true;
            this.colliderBottom.visible = true;
            this.colliderBottom.body.allowGravity = false;
            this.colliderGroup.add(this.colliderBottom);

        }


        startGame() {



            this.player.body.allowGravity = true;

            this.player.play("fly");
            this.player.alive = true;
            this.player.flap();
            this.player.body.velocity.x = 100;

            if (this.playerStart != null) this.player.x = this.playerStart;

            this.idleTween.pause();
            this.isStarted = true;


        }

        render() {

            this.game.debug.cameraInfo(this.game.camera, 32, 32);
            this.game.debug.bodyInfo(this.player, 32, 132);


        }


       

        update() {

            if (this.isStarted) {

                this.bg.tilePosition.x -= 1.5;
                this.game.physics.arcade.overlap(this.colliderGroup, this.player, this.collisionHandlerBounds, null, this);

            }

        }

        collisionHandlerBounds(_player: Player, _bound: Phaser.Sprite) { _player.kill(); }

      
    }
}