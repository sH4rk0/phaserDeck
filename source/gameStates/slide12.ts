/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>

module core {
    export class slide12 extends Phaser.State {

        constructor() {

            super();


        }

        init() { console.log("intro init 12"); }

        preload() {this.game.add.image(0,0,"bg12"); }

        create() { console.log("intro create 12"); }

        update() { }


    }
}