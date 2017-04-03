/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>

module core {
    export class slide3 extends Phaser.State {

        constructor() {

            super();


        }

        init() { console.log("intro init 3"); }

        preload() { this.game.add.image(0,0,"bg3"); }

        create() { console.log("intro create 3"); }

        update() { }


    }
}