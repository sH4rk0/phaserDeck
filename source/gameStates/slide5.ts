/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>

module core {
    export class slide5 extends Phaser.State {

        constructor() {

            super();


        }

        init() { console.log("intro init 5"); }

        preload() { this.game.add.image(0,0,"bg5"); }

        create() { console.log("intro create 5"); }

        update() { }


    }
}