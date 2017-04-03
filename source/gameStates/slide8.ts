/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>

module core {
    export class slide8 extends Phaser.State {

        constructor() {

            super();


        }

        init() { console.log("intro init 8"); }

        preload() { this.game.add.image(0,0,"bg8"); }

        create() { console.log("intro create 8"); }

        update() { }


    }
}