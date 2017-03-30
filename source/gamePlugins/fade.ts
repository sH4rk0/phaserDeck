/// <reference path="../lib/phaser.d.ts"/>


module core {


    export enum fadeType { RANDOM = -1, LINEAR = 0, DIAGONAL = 1, FROMLEFT = 2, CIRCULAR = 3, SQUARE = 4, TRON = 5 }

    export class stateFade extends Phaser.Plugin {


        private settings: any;
        private _originalStateMethods: any;
        private _texture: Phaser.RenderTexture;
        private _cover: Phaser.Sprite;
        private _this: Phaser.Plugin;
        private _toState: string;
        private sequences: Array<Array<number>> = [
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
            [0, 1, 8, 2, 9, 16, 3, 10, 17, 24, 4, 11, 18, 25, 32, 5, 12, 19, 26, 33, 40, 6, 13, 20, 27, 34, 41, 7, 14, 21, 28, 35, 42, 15, 22, 29, 36, 43, 23, 30, 37, 44, 31, 38, 45, 39, 46, 47],
            [0, 8, 16, 24, 32, 40, 41, 33, 25, 17, 9, 1, 2, 10, 18, 26, 34, 42, 43, 35, 27, 19, 11, 3, 4, 12, 20, 28, 36, 44, 45, 37, 29, 21, 13, 5, 6, 14, 22, 30, 38, 46, 47, 39, 31, 23, 15, 7],
            [27, 28, 20, 19, 18, 26, 34, 35, 36, 37, 29, 21, 13, 12, 11, 10, 9, 17, 25, 33, 41, 42, 43, 44, 45, 46, 38, 30, 22, 14, 6, 5, 4, 3, 2, 1, 0, 8, 16, 24, 32, 40, 47, 39, 31, 23, 15, 7],
            [40, 47, 7, 0, 41, 32, 46, 39, 6, 15, 1, 8, 42, 33, 24, 45, 38, 31, 5, 14, 23, 2, 9, 16, 43, 34, 25, 44, 37, 30, 4, 13, 22, 3, 10, 17, 35, 26, 36, 29, 12, 21, 11, 18, 27, 28, 20, 19],
            [40, 41, 42, 43, 44, 45, 46, 47, 39, 31, 23, 15, 7, 6, 5, 4, 3, 2, 1, 0, 8, 16, 24, 32, 33, 34, 35, 36, 37, 38, 30, 22, 14, 13, 12, 11, 10, 9, 17, 25, 26, 27, 28, 29, 21, 20, 19, 18]

        ];

        private groupFade: Phaser.Group;

        constructor(game: Phaser.Game, parent: Phaser.PluginManager) {

            super(game, parent);

            this.settings = {
                type: -1,
                duration: Phaser.Timer.SECOND * 0.3,
                ease: Phaser.Easing.Exponential.InOut,
                properties: { alpha: 0 }
            };

            this._this = this;

        }

        configure(options: Object) {

            var property;
            if (options) {
                for (property in options) {
                    if (this.settings[property]) {
                        this.settings[property] = options[property];
                    }
                }
            }



        }

        to(state: string): void {

            this._toState = state;
            this.showTiles();


        }


        showTiles() {

            this.createTiles(0);

            let _sprite: Phaser.Sprite, _sequence: Array<number> = [];

            if (this.settings.type == -1) {

                _sequence = this.sequences[this.game.rnd.integerInRange(0, this.sequences.length - 1)];

            } else {

                _sequence = this.sequences[this.settings.type];
            }



            for (var _i = 0; _i < 48; _i++) {

                _sprite = this.groupFade.getAt(_sequence[_i]) as Phaser.Sprite;
                _sprite.health = _i;

                this.game.add.tween(_sprite).to({ alpha: 1 }, this.settings.duration, this.settings.ease, true, _i * 10).onComplete.add(function (sprite) {
                    if (sprite.health == 47) {

                        this.step2(this);

                    }

                }, this);
            }


        }





        hideTiles() {

            this.createTiles(1);

            let _sprite: Phaser.Sprite, _sequence: Array<number> = [];

            if (this.settings.type == -1) {

                _sequence = this.sequences[this.game.rnd.integerInRange(0, this.sequences.length - 1)];

            } else {

                _sequence = this.sequences[this.settings.type];
            }

            for (var _i = 0; _i < 48; _i++) {

                _sprite = this.groupFade.getAt(_sequence[_i]) as Phaser.Sprite;
                _sprite.health = _i;

                this.game.add.tween(_sprite).to({ alpha: 0 }, this.settings.duration, this.settings.ease, true, _i * 10).onComplete.add(function (sprite) {
                    if (sprite.health == 47) {

                    }

                }, this);
            }


        }









        step2(_this: stateFade) {


            this.game.state.start(this._toState);

            this.game.state.states[this._toState].init = function () {



                _this.hideTiles();


            };

        }

        createTiles(alpha: number) {

            this.groupFade = this.game.add.group();
            this.groupFade.fixedToCamera = true;
            this.groupFade.visible = true;

            let _x: number, _y: number, _w: number = Math.ceil(this.game.width / 8), _h: number = Math.ceil(this.game.height / 6), _sprite: Phaser.Sprite, _sequence: Array<number> = [];


            for (var _i = 0; _i < 48; _i++) {

                _x = (_i % 8);
                _y = Math.floor(_i / 8);
                _sprite = this.game.add.sprite(_x * _w, _y * _h, this.game.cache.getBitmapData('fade'));
                _sprite.width = _w;
                _sprite.height = _h;
                _sprite.alpha = alpha;
                _sprite.name = "fade" + _i;
                this.groupFade.add(_sprite);
            }


        }




    }
}

