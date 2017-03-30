/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>

module core {
    export class intro extends Phaser.State {

        constructor() {

            super();


        }

         init() { console.log("intro init"); }

        preload() { console.log("intro preload"); }

        create() { console.log("intro create"); }

        update() { }





    }
}