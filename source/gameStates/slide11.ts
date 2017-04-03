/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>

module core {
    export class slide11 extends Phaser.State {

        constructor() {

            super();


        }

        init() { console.log("intro init 11"); }

        preload() {this.game.add.image(0,0,"bg11"); }

        create() { console.log("intro create 11"); }

        update() { }


    }
}