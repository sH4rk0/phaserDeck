/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>

module core {
    export class slide28 extends Phaser.State {

        constructor() {

            super();


        }

        init() { console.log("intro init 20"); }

        preload() { this.game.add.image(0,0,"bg28"); }

        create() { console.log("intro create 20"); }

        update() { }


    }
}