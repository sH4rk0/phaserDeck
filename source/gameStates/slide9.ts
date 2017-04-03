/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>

module core {
    export class slide9 extends Phaser.State {

        constructor() {

            super();


        }

        init() { console.log("intro init 9"); }

        preload() { this.game.add.image(0,0,"bg9"); }

        create() { console.log("intro create 9"); }

        update() { }


    }
}