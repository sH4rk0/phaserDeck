/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>

module core {
    export class slide6 extends Phaser.State {

        constructor() {

            super();


        }

        init() { console.log("intro init 6"); }

        preload() { this.game.add.image(0,0,"bg6"); }

        create() { console.log("intro create 6"); }

        update() { }


    }
}