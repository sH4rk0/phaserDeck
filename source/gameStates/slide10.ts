/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>

module core {
    export class slide10 extends Phaser.State {

        constructor() {

            super();


        }

        init() { console.log("intro init 10"); }

        preload() { this.game.add.image(0,0,"bg10"); }

        create() { console.log("intro create 10"); }

        update() { }


    }
}