var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="lib/phaser.d.ts"/>
var WebFontConfig = {
    active: function () { },
    google: {
        families: ['Press Start 2P']
    }
};
var core;
(function (core) {
    var _newGame;
    function isMobile(game) {
        if (game.device.touch && (game.device.iOS || game.device.android || game.device.windowsPhone)) {
            return true;
        }
        else {
            return false;
        }
    }
    core.isMobile = isMobile;
    function goState(_state, _type, _game) {
        var st = _game.plugins.add(core.stateFade);
        if (isMobile(_game)) {
            st.configure({
                type: _type,
                duration: 400,
                ease: Phaser.Easing.Cubic.InOut,
                properties: { alpha: 0 }
            });
        }
        else {
            st.configure({
                type: _type,
                duration: 400,
                ease: Phaser.Easing.Exponential.InOut,
                properties: { alpha: 0, scale: { x: 1.5, y: 1.5 } }
            });
        }
        st.to(_state);
    }
    core.goState = goState;
    var initGame = (function () {
        function initGame(width, height) {
            var dpr = 1;
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
            }
            catch (err) {
                alert(JSON.stringify(err));
            }
            try {
                this.game = new Phaser.Game(width, height, Phaser.AUTO, "", null, false, false);
                this.game.state.add("boot", core.boot, false);
                this.game.state.add("preloader", core.preloader, false);
                this.game.state.add("intro", core.intro, false);
                this.game.state.add("menu", core.menu, false);
                this.game.state.add("map", core.map, false);
                this.game.state.start("boot");
            }
            catch (err) {
                alert(JSON.stringify(err));
            }
        }
        return initGame;
    }());
    core.initGame = initGame;
    window.onresize = function () { };
    window.onload = function () {
        _newGame = new initGame(1024, 600);
    };
})(core || (core = {}));
var gameData = {
    assets: {
        spritesheets: [],
        images: [{ name: "bg", path: "assets/images/bg.jpg" },],
        sounds: [],
        bitmapfont: []
    },
    map: [],
    levels: []
};
/// <reference path="../lib/phaser.d.ts"/>
var core;
(function (core) {
    (function (fadeType) {
        fadeType[fadeType["RANDOM"] = -1] = "RANDOM";
        fadeType[fadeType["LINEAR"] = 0] = "LINEAR";
        fadeType[fadeType["DIAGONAL"] = 1] = "DIAGONAL";
        fadeType[fadeType["FROMLEFT"] = 2] = "FROMLEFT";
        fadeType[fadeType["CIRCULAR"] = 3] = "CIRCULAR";
        fadeType[fadeType["SQUARE"] = 4] = "SQUARE";
        fadeType[fadeType["TRON"] = 5] = "TRON";
    })(core.fadeType || (core.fadeType = {}));
    var fadeType = core.fadeType;
    var stateFade = (function (_super) {
        __extends(stateFade, _super);
        function stateFade(game, parent) {
            _super.call(this, game, parent);
            this.sequences = [
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
                [0, 1, 8, 2, 9, 16, 3, 10, 17, 24, 4, 11, 18, 25, 32, 5, 12, 19, 26, 33, 40, 6, 13, 20, 27, 34, 41, 7, 14, 21, 28, 35, 42, 15, 22, 29, 36, 43, 23, 30, 37, 44, 31, 38, 45, 39, 46, 47],
                [0, 8, 16, 24, 32, 40, 41, 33, 25, 17, 9, 1, 2, 10, 18, 26, 34, 42, 43, 35, 27, 19, 11, 3, 4, 12, 20, 28, 36, 44, 45, 37, 29, 21, 13, 5, 6, 14, 22, 30, 38, 46, 47, 39, 31, 23, 15, 7],
                [27, 28, 20, 19, 18, 26, 34, 35, 36, 37, 29, 21, 13, 12, 11, 10, 9, 17, 25, 33, 41, 42, 43, 44, 45, 46, 38, 30, 22, 14, 6, 5, 4, 3, 2, 1, 0, 8, 16, 24, 32, 40, 47, 39, 31, 23, 15, 7],
                [40, 47, 7, 0, 41, 32, 46, 39, 6, 15, 1, 8, 42, 33, 24, 45, 38, 31, 5, 14, 23, 2, 9, 16, 43, 34, 25, 44, 37, 30, 4, 13, 22, 3, 10, 17, 35, 26, 36, 29, 12, 21, 11, 18, 27, 28, 20, 19],
                [40, 41, 42, 43, 44, 45, 46, 47, 39, 31, 23, 15, 7, 6, 5, 4, 3, 2, 1, 0, 8, 16, 24, 32, 33, 34, 35, 36, 37, 38, 30, 22, 14, 13, 12, 11, 10, 9, 17, 25, 26, 27, 28, 29, 21, 20, 19, 18]
            ];
            this.settings = {
                type: -1,
                duration: Phaser.Timer.SECOND * 0.3,
                ease: Phaser.Easing.Exponential.InOut,
                properties: { alpha: 0 }
            };
            this._this = this;
        }
        stateFade.prototype.configure = function (options) {
            var property;
            if (options) {
                for (property in options) {
                    if (this.settings[property]) {
                        this.settings[property] = options[property];
                    }
                }
            }
        };
        stateFade.prototype.to = function (state) {
            this._toState = state;
            this.showTiles();
        };
        stateFade.prototype.showTiles = function () {
            this.createTiles(0);
            var _sprite, _sequence = [];
            if (this.settings.type == -1) {
                _sequence = this.sequences[this.game.rnd.integerInRange(0, this.sequences.length - 1)];
            }
            else {
                _sequence = this.sequences[this.settings.type];
            }
            for (var _i = 0; _i < 48; _i++) {
                _sprite = this.groupFade.getAt(_sequence[_i]);
                _sprite.health = _i;
                this.game.add.tween(_sprite).to({ alpha: 1 }, this.settings.duration, this.settings.ease, true, _i * 10).onComplete.add(function (sprite) {
                    if (sprite.health == 47) {
                        this.step2(this);
                    }
                }, this);
            }
        };
        stateFade.prototype.hideTiles = function () {
            this.createTiles(1);
            var _sprite, _sequence = [];
            if (this.settings.type == -1) {
                _sequence = this.sequences[this.game.rnd.integerInRange(0, this.sequences.length - 1)];
            }
            else {
                _sequence = this.sequences[this.settings.type];
            }
            for (var _i = 0; _i < 48; _i++) {
                _sprite = this.groupFade.getAt(_sequence[_i]);
                _sprite.health = _i;
                this.game.add.tween(_sprite).to({ alpha: 0 }, this.settings.duration, this.settings.ease, true, _i * 10).onComplete.add(function (sprite) {
                    if (sprite.health == 47) {
                    }
                }, this);
            }
        };
        stateFade.prototype.step2 = function (_this) {
            this.game.state.start(this._toState);
            this.game.state.states[this._toState].init = function () {
                _this.hideTiles();
            };
        };
        stateFade.prototype.createTiles = function (alpha) {
            this.groupFade = this.game.add.group();
            this.groupFade.fixedToCamera = true;
            this.groupFade.visible = true;
            var _x, _y, _w = Math.ceil(this.game.width / 8), _h = Math.ceil(this.game.height / 6), _sprite, _sequence = [];
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
        };
        return stateFade;
    }(Phaser.Plugin));
    core.stateFade = stateFade;
})(core || (core = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>
var core;
(function (core) {
    var intro = (function (_super) {
        __extends(intro, _super);
        function intro() {
            _super.call(this);
        }
        intro.prototype.init = function () { console.log("intro init"); };
        intro.prototype.preload = function () { console.log("intro preload"); };
        intro.prototype.create = function () { console.log("intro create"); };
        intro.prototype.update = function () { };
        return intro;
    }(Phaser.State));
    core.intro = intro;
})(core || (core = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>
var core;
(function (core) {
    var map = (function (_super) {
        __extends(map, _super);
        function map() {
            _super.call(this);
        }
        map.prototype.preload = function () { };
        map.prototype.create = function () { };
        map.prototype.update = function () { };
        return map;
    }(Phaser.State));
    core.map = map;
})(core || (core = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>
var core;
(function (core) {
    var menu = (function (_super) {
        __extends(menu, _super);
        function menu() {
            _super.call(this);
        }
        menu.prototype.preload = function () { };
        menu.prototype.create = function () { };
        menu.prototype.update = function () { };
        return menu;
    }(Phaser.State));
    core.menu = menu;
})(core || (core = {}));
var core;
(function (core) {
    var boot = (function (_super) {
        __extends(boot, _super);
        function boot() {
            _super.apply(this, arguments);
        }
        boot.prototype.preload = function () {
            var bmd = this.game.add.bitmapData(200, 50);
            bmd.ctx.fillStyle = '#0096ff';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 200, 50);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('loadingBar', bmd);
            bmd = this.game.add.bitmapData(200, 50);
            bmd.ctx.fillStyle = '#0096ff';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 200, 50);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('startBtn', bmd);
            bmd = this.game.add.bitmapData(100, 100);
            bmd.ctx.fillStyle = '#000000';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 100, 100);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('fade', bmd);
        };
        boot.prototype.create = function () {
            this.game.stage.backgroundColor = '#ffcc00';
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.stage.smoothed = false;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.game.state.start('preloader');
        };
        return boot;
    }(Phaser.State));
    core.boot = boot;
})(core || (core = {}));
var core;
(function (core) {
    var preloader = (function (_super) {
        __extends(preloader, _super);
        function preloader() {
            _super.apply(this, arguments);
        }
        preloader.prototype.preload = function () {
            try {
                this.game.load.onLoadStart.add(function () { }, this);
                this.game.load.onFileStart.add(function () { console.log("onFileStart"); }, this);
                this.game.load.onFileError.add(function (filekey, file) { console.log("onFileError"); }, this);
                this.game.load.onFileComplete.add(this.fileComplete, this);
                this.game.load.onLoadComplete.add(function () {
                    this.loadingBar.visible = false;
                    this.loadingPerc.visible = false;
                    this.startBtn.visible = true;
                    this.game.input.onDown.addOnce(this.startGame, this);
                }, this);
                //start button
                //--------------------------
                this.startBtn = this.game.add.image(this.game.world.centerX, this.game.world.centerY, this.game.cache.getBitmapData('startBtn'));
                this.startBtn.anchor.setTo(0.5);
                var _spriteText = this.game.add.text(0, 0, 'START', { fill: '#ffffff' });
                _spriteText.anchor.set(0.5);
                this.startBtn.addChild(_spriteText);
                this.startBtn.visible = false;
                //Loading container
                //--------------------------
                this.loadingBar = this.game.add.image(this.game.world.centerX, this.game.world.centerY, this.game.cache.getBitmapData('loadingBar'));
                this.loadingBar.anchor.setTo(0.5);
                this.loadingPerc = this.game.add.text(0, 0, '0%', { wordWrap: true, wordWrapWidth: this.loadingBar.width, fill: '#ffffff', stroke: '#0096ff', strokeThickness: 5 });
                this.loadingPerc.anchor.set(0.5);
                this.loadingBar.addChild(this.loadingPerc);
                this.game.load.setPreloadSprite(this.loadingBar);
                //Assets Load
                //--------------------------	
                // IMAGES		
                for (var i = 0; i < gameData.assets.images.length; i++) {
                    this.game.load.image(gameData.assets.images[i].name, gameData.assets.images[i].path);
                }
                // SPRITESHEETS		
                for (var i = 0; i < gameData.assets.spritesheets.length; i++) {
                    this.game.load.spritesheet(gameData.assets.spritesheets[i].name, gameData.assets.spritesheets[i].path, gameData.assets.spritesheets[i].width, gameData.assets.spritesheets[i].height, gameData.assets.spritesheets[i].frames);
                }
                //bitmap fonts
                for (var i = 0; i < gameData.assets.bitmapfont.length; i++) {
                    this.game.load.bitmapFont(gameData.assets.bitmapfont[i].name, gameData.assets.bitmapfont[i].imgpath, gameData.assets.bitmapfont[i].xmlpath);
                }
                // SOUNDS		
                for (var i = 0; i < gameData.assets.sounds.length; i++) {
                    this.game.load.audio(gameData.assets.sounds[i].name, gameData.assets.sounds[i].paths);
                }
            }
            catch (err) {
                JSON.stringify(err);
            }
        };
        preloader.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
            try {
                this.loadingPerc.text = progress + "%";
            }
            catch (err) {
                JSON.stringify(err);
            }
        };
        preloader.prototype.startGame = function () {
            core.goState("intro", core.fadeType.RANDOM, this.game);
        };
        return preloader;
    }(Phaser.State));
    core.preloader = preloader;
})(core || (core = {}));
