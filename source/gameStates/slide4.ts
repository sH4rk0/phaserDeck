/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>

module core {
    export class slide4 extends Phaser.State {

        constructor() {

            super();


        }

        init() { console.log("intro init 4"); }

        preload() { this.game.add.image(0,0,"bg4");}
        create() { console.log("intro create 4"); }

        update() { }


    }
}