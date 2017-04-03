/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>

module core {
    export class slide15 extends Phaser.State {

        constructor() {

            super();


        }

        init() { console.log("intro init 15"); }

        preload() { this.game.add.image(0,0,"bg15"); }

        create() { console.log("intro create 15"); }

        update() { }


    }
}