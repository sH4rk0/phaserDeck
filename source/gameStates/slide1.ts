/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>

module core {
    export class slide1 extends Phaser.State {

        private francesco: Phaser.Sprite;
        private _animations: Array<Phaser.Animation>;
        constructor() {

            super();


        }

        init() { console.log("intro init 1"); }

        preload() { console.log("intro preload 1"); }

        create() {
             this.game.world.setBounds(0, 0, 1024, 768);
            this.game.add.image(0, 0, "bg1");
            this.francesco = this.game.add.sprite(0, 0, 'francesco');
            this.francesco.anchor.set(.5);
            this.francesco.scale.set(2);
            this.francesco.x = this.game.world.centerX;
            this.francesco.y = this.game.world.centerY + 168;
            this._animations = [];
            this._animations.push(this.francesco.animations.add("idle", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 9, false, true));
            this._animations[0].onComplete.add(() => this.randomAnim(), this);

            this._animations.push(this.francesco.animations.add('barba', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 13, 14, 14, 15, 15, 14, 14, 15, 15, 14, 14, 13, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 9, false, true));
            this._animations[1].onComplete.add(() => this.randomAnim(), this);

            this._animations.push(this.francesco.animations.add('occhi', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,], 9, false, true));
            this._animations[2].onComplete.add(() => this.randomAnim(), this);

            this._animations.push(this.francesco.animations.add('gratta', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 17, 18, 18, 19, 19, 18, 18, 19, 19, 18, 18, 17, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 9, false, true));
            this._animations[3].onComplete.add(() => this.randomAnim(), this);

            this._animations.push(this.francesco.animations.add('smile', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 9, false, true));
            this._animations[4].onComplete.add(() => this.randomAnim(), this);

            this._animations.push(this.francesco.animations.add('sinistra', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 9, false, true));
            this._animations[5].onComplete.add(() => this.randomAnim(), this);

            this._animations.push(this.francesco.animations.add('sinistraLow', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 9, false, true));
            this._animations[6].onComplete.add(() => this.randomAnim(), this);

            this._animations.push(this.francesco.animations.add('destra', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 8, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 9, false, true));
            this._animations[7].onComplete.add(() => this.randomAnim(), this);

            this._animations.push(this.francesco.animations.add('destraLow', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 9, false, true));
            this._animations[8].onComplete.add(() => this.randomAnim(), this);

            this._animations.push(this.francesco.animations.add('nono', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 7, 7, 0, 4, 4, 0, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 9, false, true));
            this._animations[9].onComplete.add(() => this.randomAnim(), this);


            this.randomAnim();

        }

        randomAnim(): void {
          
            this._animations[this.game.rnd.integerInRange(0, 9)].play();


        }
        update() { }


    }
}