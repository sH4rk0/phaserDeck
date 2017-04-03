/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>

module core {
    export class slide7 extends Phaser.State {

        constructor() {

            super();


        }

        init() { console.log("intro init 7"); }

        preload() { this.game.add.image(0,0,"bg7");}

        create() { console.log("intro create 7"); }

        update() { }


    }
}