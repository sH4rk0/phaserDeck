/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>

module core {

    export class slide2 extends Phaser.State {


        private groups: Array<Phaser.Group>;

        constructor() {

            super();


        }

        init() { console.log("intro init 2"); }

        preload() { this.game.add.image(0, 0, "bg2"); }

        create() {
            this.game.physics.arcade.gravity.y = 0;
            this.game.world.setBounds(0, 0, 1024, 768);
            this.groups = [];
            for (let g = 0; g < 4; g++) this.groups.push(this.game.add.group())


            new PlayerFake(this.game, 0, 440);
            new PlayerFake(this.game, 1, 460);
            new PlayerFake(this.game, 2, 480);
            new PlayerFake(this.game, 3, 500);

            new mummy(this.game, -400, 470);

            let _mummy: mummy;
            let _z: number = 0;
            let _y: number = 0;
            for (let i = 0; i < 50; i++) {

                switch(_z){
                    case 0:
                    _y = this.game.rnd.integerInRange(440, 459);
                    break;

                    case 1:
                    _y = this.game.rnd.integerInRange(460, 479);
                    break;

                    case 2:
                    _y = this.game.rnd.integerInRange(480, 499);
                    break;

                    case 3:
                    _y = this.game.rnd.integerInRange(500, 520);
                    break;
                }
                _mummy = new mummy(this.game, -1000-(i*50)+(this.game.rnd.realInRange(-20,20)),_y);

            this.groups[_z].add(_mummy);

            _z++;
            if (_z == 4) _z = 0;

           
            

        }


    }

    update() { }


}
}


module core {

    export class PlayerFake extends Phaser.Sprite {

        game: Phaser.Game;
        gameState: any;
        anim: Array<Phaser.Animation>;
        vel: number;

        constructor(game: Phaser.Game, avatar: number, _y: number) {

            super(game, 0, _y, "players");
            this.scale.set(2);
            this.anchor.setTo(0.5, 1);
            this.game.physics.arcade.enableBody(this);
            this.x = this.game.rnd.realInRange(-200,-300);
            var frames: any = [
                [[0, 1, 2, 3, 4, 5, 6, 7], [8, 9, 10, 11, 12, 13]],
                [[14, 15, 16, 17, 18, 19, 20, 21], [22, 23, 24, 25, 26, 27]],
                [[28, 29, 30, 31, 32, 33, 34, 35], [36, 37, 38, 39]],
                [[42, 43, 44, 45, 46, 47, 48, 49], [50, 51, 52, 53]]
            ];
            this.anim = [];
            var anim = this.animations.add("idle", frames[avatar][1], 5 + (game.rnd.integerInRange(1, 3)), true);
            this.anim.push(anim);
            anim = this.animations.add("run", frames[avatar][0], 10 + (game.rnd.integerInRange(1, 3)), true);
            this.anim.push(anim);

            anim.play();
            this.vel = game.rnd.realInRange(2, 4);
            this.game.add.existing(this);

        }

        update() {

           

            this.x += this.vel;
                
                 if (this.x > 1200) { this.kill(); }
                
        }


    }

}



module core {

    export class mummy extends Phaser.Sprite {

        game: Phaser.Game;
        gameState: any;
        anim: Array<Phaser.Animation>;
        vel: number;
        startX: number;

        constructor(game: Phaser.Game, startX: number, startY: number) {

            super(game, startX, startY, "mummy");
            this.scale.set(3);
            this.anchor.setTo(0.5, 1);
            this.x = startX;
            this.game.physics.arcade.enableBody(this);


            this.animations.add("walk").play(this.game.rnd.realInRange(9, 11), true, false);


            this.game.add.existing(this);

        }

        update() {
 
            this.x += this.game.rnd.realInRange(1, 2);
         if (this.x > 1200) { this.kill(); }

        }


    }

}