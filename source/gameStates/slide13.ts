/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>

module core {
    export class slide13 extends Phaser.State {

        constructor() {

            super();


        }

        init() { console.log("intro init 13"); }

        preload() { this.game.add.image(0,0,"bg13"); }

        create() { console.log("intro create 13"); }

        update() { }


    }
}