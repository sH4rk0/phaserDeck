/// <reference path="lib/phaser.d.ts"/>

var WebFontConfig = {
    active: function () { },
    google: {
        families: ['Press Start 2P']
    }

};

module core {


    var _newGame: initGame;
   

    export function isMobile(game: Phaser.Game): boolean {

        if (game.device.touch && (game.device.iOS || game.device.android || game.device.windowsPhone)) {
            return true;
        }
        else {
            return false;
        }
    }

    export function goState(_state: string, _type:fadeType, _game: Phaser.Game): void {


        var st = <stateFade>_game.plugins.add(stateFade);


        if (isMobile(_game)) {

            st.configure({
                type:_type,
                duration: 400,
                ease: Phaser.Easing.Cubic.InOut,
                properties: { alpha: 0 }
            });

        } else {
            st.configure({
                type:_type,
                duration: 400,
                ease: Phaser.Easing.Exponential.InOut,
                properties: { alpha: 0, scale: { x: 1.5, y: 1.5 } }
            });

        }


        st.to(_state);

    }


    export class initGame {


        public game: Phaser.Game;

        constructor(width?: number, height?: number) {

            var dpr: number = 1;
            try {
                if (devicePixelRatio != undefined) {
                    dpr = devicePixelRatio || 1;


                    if (!width) {
                        width = screen.width * dpr;
                    }
                    if (!height) {
                        height = screen.height * dpr;
                    }

                }

            } catch (err) { alert(JSON.stringify(err)) }


            try {
                this.game = new Phaser.Game(width, height, Phaser.AUTO, "", null, false, false);

                this.game.state.add("boot", boot, false);
                this.game.state.add("preloader", preloader, false);
                this.game.state.add("intro", intro, false);
                this.game.state.add("menu", menu, false);
                this.game.state.add("map", map, false);
                this.game.state.start("boot");


            } catch (err) { alert(JSON.stringify(err)) }



        }

    }


    window.onresize = () => { }

    window.onload = () => {  _newGame = new initGame(1024, 768); }


}








