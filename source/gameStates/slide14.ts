/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>

module core {
    export class slide14 extends Phaser.State {

        constructor() {

            super();


        }

        init() { console.log("intro init 14"); }

        preload() { this.game.add.image(0,0,"bg14"); }

        create() { console.log("intro create 14"); }

        update() { }


    }
}