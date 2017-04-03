var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/// <reference path="lib/phaser.d.ts"/>
var WebFontConfig = {
    active: function () { },
    google: {
        families: ['Press Start 2P']
    }
};
var core;
(function (core) {
    function isMobile(game) {
        if (game.device.touch && (game.device.iOS || game.device.android || game.device.windowsPhone)) {
            return true;
        }
        else {
            return false;
        }
    }
    core.isMobile = isMobile;
    function loadCode(_file) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function (e) {
            if (xhr.readyState == 4) {
                core._code.innerHTML = xhr.responseText;
                hljs.highlightBlock(core._code);
            }
        };
        var _path = "data/" + _file + ".html";
        xhr.open("GET", _path, true);
        xhr.setRequestHeader('Content-type', 'text/html');
        xhr.send();
    }
    core.loadCode = loadCode;
    function setCurrentIndex(_state) {
        var _index = 0;
        core.presentationData.slides.forEach(function (element) {
            if (element.state === _state) {
                core._currentIndex = _index;
            }
            _index++;
        });
    }
    core.setCurrentIndex = setCurrentIndex;
    function setResize() {
        core._slidesContainer.style.height = window.innerHeight + "px";
        core._slidesContainer.style.width = window.innerWidth + "px";
        core._codeContainer.style.height = window.innerHeight + "px";
        //_codeContainer.style.width = window.innerWidth + "px";
    }
    core.setResize = setResize;
    function goState(_state, _type, _game) {
        setUpSlide(_state);
        _game.state.start(_state);
        /*
        let st = <stateFade>_game.plugins.add(stateFade);
        
        if (isMobile(_game)) {

            st.configure({
                type: _type,
                duration: 400,
                ease: Phaser.Easing.Cubic.InOut,
                properties: { alpha: 0 }
            });

        } else {
            st.configure({
                type: _type,
                duration: 400,
                ease: Phaser.Easing.Exponential.InOut,
                properties: { alpha: 0, scale: { x: 1.5, y: 1.5 } }
            });

        }

        st.to(_state);
*/
    }
    core.goState = goState;
    function setUpSlide(_state) {
        var _obj = core.presentationData.slides[core._currentIndex];
        core._code.innerHTML = "";
        if (_obj.code != "") {
            loadCode(_obj.code);
            core._codeBtn.className = "menuBtn";
        }
        else {
            core._codeBtn.className = "menuBtn disabled";
        }
        if ((core._currentIndex + 1) >= core.presentationData.slides.length) {
            core._nextBtn.className = "menuBtn disabled";
        }
        else {
            core._nextBtn.className = "menuBtn";
        }
        if ((core._currentIndex - 1) == -1) {
            core._prevBtn.className = "menuBtn disabled";
        }
        else {
            core._prevBtn.className = "menuBtn";
        }
    }
    core.setUpSlide = setUpSlide;
    var initPresentation = (function () {
        function initPresentation(width, height) {
            var _this = this;
            var dpr = 1;
            core._currentIndex = 0;
            if (devicePixelRatio != undefined) {
                dpr = devicePixelRatio || 1;
                if (!width) {
                    width = screen.width * dpr;
                }
                if (!height) {
                    height = screen.height * dpr;
                }
            }
            core._game = new Phaser.Game(width, height, Phaser.AUTO, "", null, false, false);
            core._game.state.add("boot", core.boot, false);
            core._game.state.add("preloader", core.preloader, false);
            core._game.state.add("slide1", core.slide1, false);
            core._game.state.add("slide2", core.slide2, false);
            core._game.state.add("slide3", core.slide3, false);
            core._game.state.add("slide4", core.slide4, false);
            core._game.state.add("slide5", core.slide5, false);
            core._game.state.add("slide6", core.slide6, false);
            core._game.state.add("slide7", core.slide7, false);
            core._game.state.add("slide8", core.slide8, false);
            core._game.state.add("slide9", core.slide9, false);
            core._game.state.add("slide10", core.slide10, false);
            core._game.state.add("slide11", core.slide11, false);
            core._game.state.add("slide12", core.slide12, false);
            core._game.state.add("slide13", core.slide13, false);
            core._game.state.add("slide14", core.slide14, false);
            core._game.state.add("slide15", core.slide15, false);
            core._game.state.add("slide16", core.slide16, false);
            core._game.state.add("slide17", core.slide17, false);
            core._game.state.add("slide18", core.slide18, false);
            core._game.state.add("slide19", core.slide19, false);
            core._game.state.add("slide20", core.slide20, false);
            core._game.state.add("slide21", core.slide21, false);
            core._game.state.add("slide22", core.slide22, false);
            core._game.state.add("slide23", core.slide23, false);
            core._game.state.add("slide24", core.slide24, false);
            core._game.state.add("slide25", core.slide25, false);
            core._game.state.add("slide26", core.slide26, false);
            core._game.state.add("slide27", core.slide27, false);
            core._game.state.add("slide28", core.slide28, false);
            core._game.state.start("boot");
            core._presentationMenu = document.getElementById("presentationMenu");
            core._slidesContainer = document.getElementById("slidesContainer");
            core._codeContainer = document.getElementById("codeContainer");
            core._slides = document.getElementById("slides");
            core._code = document.getElementById("code");
            var mString;
            var mElement;
            core.presentationData.slides.forEach(function (element) {
                mElement = document.createElement("div");
                mElement.id = element.state;
                mElement.className = "mSlide";
                mElement.innerHTML = "<div style='background-image:url(" + element.preview + ");' class='mImage'></div><div class='mTitle'>" + element.title + "</div></div>";
                mElement.addEventListener("click", function () {
                    core._slidesContainer.className = "hide";
                    setCurrentIndex(element.state);
                    goState(element.state, core.fadeType.RANDOM, core._game);
                });
                core._slides.appendChild(mElement);
            });
            core._slidesBtn = document.createElement("div");
            core._slidesBtn.id = "slidesBtn";
            core._slidesBtn.className = "menuBtn";
            core._slidesBtn.addEventListener("click", function () { return _this.toggleSlides(); });
            core._presentationMenu.appendChild(core._slidesBtn);
            core._prevBtn = document.createElement("div");
            core._prevBtn.id = "prevBtn";
            core._prevBtn.className = "menuBtn disabled";
            core._prevBtn.addEventListener("click", function () { return _this.prevState(); });
            core._presentationMenu.appendChild(core._prevBtn);
            core._nextBtn = document.createElement("div");
            core._nextBtn.id = "nextBtn";
            core._nextBtn.className = "menuBtn disabled";
            core._nextBtn.addEventListener("click", function () { return _this.nextState(); });
            core._presentationMenu.appendChild(core._nextBtn);
            core._codeBtn = document.createElement("div");
            core._codeBtn.id = "codeBtn";
            core._codeBtn.className = "menuBtn disabled";
            core._codeBtn.addEventListener("click", function () { return _this.toggleCode(); });
            core._presentationMenu.appendChild(core._codeBtn);
            core._fullscreenBtn = document.createElement("div");
            core._fullscreenBtn.id = "fullscreenBtn";
            core._fullscreenBtn.className = "menuBtn";
            core._fullscreenBtn.addEventListener("click", function () { return _this.toggleFullScreen(); });
            core._presentationMenu.appendChild(core._fullscreenBtn);
            core._textBtn = document.createElement("div");
            core._textBtn.id = "textBtn";
            core._textBtn.className = "menuBtn";
            core._textBtn.addEventListener("click", function () { return _this.toggleFontSize(); });
            core._codeContainer.appendChild(core._textBtn);
            window.onkeyup = function (e) {
                var key = e.keyCode ? e.keyCode : e.which;
                console.log(key);
                if (key == 39) {
                    _this.nextState();
                }
                else if (key == 37) {
                    _this.prevState();
                }
            };
            setResize();
        }
        initPresentation.prototype.toggleSlides = function () {
            if (core._slidesContainer.className === "") {
                core._slidesContainer.className = "hide";
            }
            else {
                core._slidesContainer.className = "";
            }
        };
        initPresentation.prototype.toggleFontSize = function () {
        };
        initPresentation.prototype.toggleCode = function () {
            if (core._codeContainer.className === "") {
                core._codeContainer.className = "hide";
            }
            else {
                core._codeContainer.className = "";
            }
        };
        initPresentation.prototype.toggleFullScreen = function () {
            if ((document.fullScreenElement && document.fullScreenElement !== null) ||
                (!document.mozFullScreen && !document.webkitIsFullScreen)) {
                core._fullscreenBtn.className = "menuBtn active";
                if (document.documentElement.requestFullScreen) {
                    document.documentElement.requestFullScreen();
                }
                else if (document.documentElement.mozRequestFullScreen) {
                    document.documentElement.mozRequestFullScreen();
                }
                else if (document.documentElement.webkitRequestFullScreen) {
                    document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
                }
            }
            else {
                core._fullscreenBtn.className = "menuBtn";
                if (document.cancelFullScreen) {
                    document.cancelFullScreen();
                }
                else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                }
                else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                }
            }
        };
        initPresentation.prototype.prevState = function () {
            core._currentIndex--;
            if (core._currentIndex < 0)
                core._currentIndex = 0;
            goState(core.presentationData.slides[core._currentIndex].state, core.fadeType.RANDOM, core._game);
        };
        initPresentation.prototype.nextState = function () {
            core._currentIndex++;
            if (core._currentIndex >= core.presentationData.slides.length)
                core._currentIndex = core.presentationData.slides.length - 1;
            goState(core.presentationData.slides[core._currentIndex].state, core.fadeType.RANDOM, core._game);
        };
        return initPresentation;
    }());
    window.onload = function () { return new initPresentation(1024, 768); };
    window.onresize = function () { return setResize(); };
})(core || (core = {}));
var core;
(function (core) {
    core.presentationData = {
        slides: [
            {
                title: "Presentazione",
                state: "slide1",
                preview: "assets/images/slide1/preview.png",
                code: ""
            },
            {
                title: "I want to make a videogame with javascript",
                state: "slide2",
                preview: "assets/images/slide2/bg.png",
                code: ""
            },
            {
                title: "Frameworks scenario",
                state: "slide3",
                preview: "assets/images/slide3/bg.png",
                code: ""
            },
            {
                title: "PhaserJs",
                state: "slide4",
                preview: "assets/images/slide4/bg.png",
                code: ""
            },
            {
                title: "Overview",
                state: "slide5",
                preview: "assets/images/slide5/bg.png",
                code: ""
            },
            {
                title: "What is?",
                state: "slide6",
                preview: "assets/images/slide6/bg.png",
                code: ""
            },
            {
                title: "Who is it for?",
                state: "slide7",
                preview: "assets/images/slide7/bg.png",
                code: ""
            },
            {
                title: "Where we are && where we go?",
                state: "slide8",
                preview: "assets/images/slide8/bg.png",
                code: ""
            },
            {
                title: "What we need?",
                state: "slide9",
                preview: "assets/images/slide9/bg.png",
                code: ""
            },
            {
                title: "Code Editor",
                state: "slide10",
                preview: "assets/images/slide10/bg.png",
                code: ""
            },
            {
                title: "Local server",
                state: "slide11",
                preview: "assets/images/slide11/bg.png",
                code: ""
            },
            {
                title: "Templates",
                state: "slide12",
                preview: "assets/images/slide12/bg.png",
                code: ""
            },
            {
                title: "Code && Examples",
                state: "slide13",
                preview: "assets/images/slide13/bg.png",
                code: ""
            },
            {
                title: "Features overview",
                state: "slide14",
                preview: "assets/images/slide14/bg.png",
                code: ""
            },
            {
                title: "Hello world",
                state: "slide15",
                preview: "assets/images/slide15/bg.png",
                code: "code15"
            },
            {
                title: "Game: step1",
                state: "slide16",
                preview: "assets/images/slide16/preview.png",
                code: "code16"
            },
            {
                title: "Game: step2",
                state: "slide17",
                preview: "assets/images/slide17/preview.png",
                code: "code17"
            },
            {
                title: "Game: step3",
                state: "slide18",
                preview: "assets/images/slide18/preview.png",
                code: "code18"
            },
            {
                title: "Game: step4",
                state: "slide19",
                preview: "assets/images/slide19/preview.png",
                code: "code19"
            },
            {
                title: "Game Examples",
                state: "slide20",
                preview: "assets/images/slide20/bg.png",
                code: ""
            },
            {
                title: "Tools and resources",
                state: "slide21",
                preview: "assets/images/slide21/bg.png",
                code: ""
            },
            {
                title: "Tools",
                state: "slide22",
                preview: "assets/images/slide22/bg.png",
                code: ""
            },
            {
                title: "Visual editors",
                state: "slide23",
                preview: "assets/images/slide23/bg.png",
                code: ""
            },
            {
                title: "Deploy",
                state: "slide24",
                preview: "assets/images/slide24/bg.png",
                code: ""
            },
            {
                title: "Monetize",
                state: "slide25",
                preview: "assets/images/slide25/bg.png",
                code: ""
            },
            {
                title: "Integration",
                state: "slide26",
                preview: "assets/images/slide26/bg.png",
                code: ""
            },
            {
                title: "Resources",
                state: "slide27",
                preview: "assets/images/slide27/bg.png",
                code: ""
            },
            {
                title: "Game Over",
                state: "slide28",
                preview: "assets/images/slide28/bg.png",
                code: ""
            }
        ]
    };
    core.gameData = {
        assets: {
            spritesheets: [
                { name: "francesco", path: "assets/images/slide1/francesco.png", width: 211, height: 200, frames: 27 },
                { name: "mummy", path: "assets/images/slide2/mummy.png", width: 37, height: 45, frames: 18 },
                { name: "players", path: "assets/images/slide2/players.png", width: 52, height: 70, frames: 84 },
            ],
            images: [
                { name: "bg1", path: "assets/images/slide1/bg.png" },
                { name: "bg2", path: "assets/images/slide2/bg.png" },
                { name: "bg3", path: "assets/images/slide3/bg.png" },
                { name: "bg4", path: "assets/images/slide4/bg.png" },
                { name: "bg5", path: "assets/images/slide5/bg.png" },
                { name: "bg6", path: "assets/images/slide6/bg.png" },
                { name: "bg7", path: "assets/images/slide7/bg.png" },
                { name: "bg8", path: "assets/images/slide8/bg.png" },
                { name: "bg9", path: "assets/images/slide9/bg.png" },
                { name: "bg10", path: "assets/images/slide10/bg.png" },
                { name: "bg11", path: "assets/images/slide11/bg.png" },
                { name: "bg12", path: "assets/images/slide12/bg.png" },
                { name: "bg13", path: "assets/images/slide13/bg.png" },
                { name: "bg14", path: "assets/images/slide14/bg.png" },
                { name: "bg15", path: "assets/images/slide15/bg.png" },
                { name: "bgGame", path: "assets/images/game/bg.jpg" },
                { name: "bg20", path: "assets/images/slide20/bg.png" },
                { name: "bg21", path: "assets/images/slide21/bg.png" },
                { name: "bg22", path: "assets/images/slide22/bg.png" },
                { name: "bg23", path: "assets/images/slide23/bg.png" },
                { name: "bg24", path: "assets/images/slide24/bg.png" },
                { name: "bg25", path: "assets/images/slide25/bg.png" },
                { name: "bg26", path: "assets/images/slide26/bg.png" },
                { name: "bg27", path: "assets/images/slide27/bg.png" },
                { name: "bg28", path: "assets/images/slide28/bg.png" }
            ],
            sounds: [],
            bitmapfont: []
        },
        map: [],
        levels: []
    };
})(core || (core = {}));
/// <reference path="../Lib/phaser.d.ts"/>
var core;
(function (core) {
    var Bomb = (function (_super) {
        __extends(Bomb, _super);
        function Bomb(game, gameState, range) {
            var _this = _super.call(this, game, game.camera.x + 1024 + 100, 0, game.cache.getBitmapData('enemy')) || this;
            _this.game = game;
            _this.gameState = gameState;
            _this.name = "bomb";
            _this.game.physics.arcade.enable(_this);
            _this.body.immovable = false;
            _this.body.allowGravity = false;
            _this.scale.set(1);
            _this.anchor.set(.5, .5);
            _this.range = range;
            if (_this.range == null) {
                _this.y = _this.game.rnd.integerInRange(100, 500);
            }
            else {
                _this.y = _this.game.rnd.integerInRange(_this.range.start, _this.range.end);
            }
            _this.vel = game.rnd.realInRange(2, 4);
            game.add.existing(_this);
            return _this;
        }
        Bomb.prototype.update = function () {
            this.x -= this.vel;
            this.angle -= this.vel;
            if (this.x < this.game.camera.x - 100) {
                this.removeEnemy();
            }
        };
        Bomb.prototype.removeEnemy = function () {
            this.kill();
            this.destroy();
        };
        return Bomb;
    }(Phaser.Sprite));
    core.Bomb = Bomb;
})(core || (core = {}));
/// <reference path="../Lib/phaser.d.ts"/>
var core;
(function (core) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, gameState) {
            var _this = _super.call(this, game, 50, game.world.centerY, game.cache.getBitmapData('player')) || this;
            _this.gameState = gameState;
            _this.game.physics.arcade.enableBody(_this);
            _this.scale.set(.5);
            _this.anchor.setTo(0.5, 0.5);
            _this.alive = false;
            _this.body.allowGravity = false;
            _this.body.collideWorldBounds = true;
            _this.game.add.existing(_this);
            return _this;
        }
        Player.prototype.update = function () {
            if (this.angle < 40 && this.alive) {
                this.angle += 0.5;
            }
            if (!this.alive) {
                this.body.velocity.x = 0;
            }
        };
        Player.prototype.flap = function () {
            if (!!this.alive) {
                this.body.velocity.y = -200;
                this.game.add.tween(this).to({ angle: -40 }, 100).start();
            }
        };
        ;
        return Player;
    }(Phaser.Sprite));
    core.Player = Player;
})(core || (core = {}));
/// <reference path="../lib/phaser.d.ts"/>
var core;
(function (core) {
    var fadeType;
    (function (fadeType) {
        fadeType[fadeType["RANDOM"] = -1] = "RANDOM";
        fadeType[fadeType["LINEAR"] = 0] = "LINEAR";
        fadeType[fadeType["DIAGONAL"] = 1] = "DIAGONAL";
        fadeType[fadeType["FROMLEFT"] = 2] = "FROMLEFT";
        fadeType[fadeType["CIRCULAR"] = 3] = "CIRCULAR";
        fadeType[fadeType["SQUARE"] = 4] = "SQUARE";
        fadeType[fadeType["TRON"] = 5] = "TRON";
    })(fadeType = core.fadeType || (core.fadeType = {}));
    var stateFade = (function (_super) {
        __extends(stateFade, _super);
        function stateFade(game, parent) {
            var _this = _super.call(this, game, parent) || this;
            _this.sequences = [
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
                [0, 1, 8, 2, 9, 16, 3, 10, 17, 24, 4, 11, 18, 25, 32, 5, 12, 19, 26, 33, 40, 6, 13, 20, 27, 34, 41, 7, 14, 21, 28, 35, 42, 15, 22, 29, 36, 43, 23, 30, 37, 44, 31, 38, 45, 39, 46, 47],
                [0, 8, 16, 24, 32, 40, 41, 33, 25, 17, 9, 1, 2, 10, 18, 26, 34, 42, 43, 35, 27, 19, 11, 3, 4, 12, 20, 28, 36, 44, 45, 37, 29, 21, 13, 5, 6, 14, 22, 30, 38, 46, 47, 39, 31, 23, 15, 7],
                [27, 28, 20, 19, 18, 26, 34, 35, 36, 37, 29, 21, 13, 12, 11, 10, 9, 17, 25, 33, 41, 42, 43, 44, 45, 46, 38, 30, 22, 14, 6, 5, 4, 3, 2, 1, 0, 8, 16, 24, 32, 40, 47, 39, 31, 23, 15, 7],
                [40, 47, 7, 0, 41, 32, 46, 39, 6, 15, 1, 8, 42, 33, 24, 45, 38, 31, 5, 14, 23, 2, 9, 16, 43, 34, 25, 44, 37, 30, 4, 13, 22, 3, 10, 17, 35, 26, 36, 29, 12, 21, 11, 18, 27, 28, 20, 19],
                [40, 41, 42, 43, 44, 45, 46, 47, 39, 31, 23, 15, 7, 6, 5, 4, 3, 2, 1, 0, 8, 16, 24, 32, 33, 34, 35, 36, 37, 38, 30, 22, 14, 13, 12, 11, 10, 9, 17, 25, 26, 27, 28, 29, 21, 20, 19, 18]
            ];
            _this.settings = {
                type: -1,
                duration: Phaser.Timer.SECOND * 0.3,
                ease: Phaser.Easing.Exponential.InOut,
                properties: { alpha: 0 }
            };
            _this._this = _this;
            _this._originalStateMethods = {};
            return _this;
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
            /*
                this._originalStateMethods[state] = this._originalStateMethods[state] || {
                  init: this.game.state.states[state].init,
                  create: this.game.state.states[state].create
                };
            
                 this._init = this._originalStateMethods[state].init;
                this._create = this._originalStateMethods[state].create;
            
            this.game.state.states[state].init = function() {
                
                  if (this._init) {
                    this._init.apply(this, arguments);
                  }
                };
            
                // Extend state create method to animate cover
                this.game.state.states[state].create = function() {
                  if (this._create) {
                    this._create.apply(this, arguments);
                  }
                 // _this.bringToTop();
                 // _this._animateCover();
                };
            */
            this.showTiles();
        };
        stateFade.prototype.showTiles = function () {
            var _this = this;
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
                        _this.step2(_this);
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
                    if (sprite.health == 47) { }
                }, this);
            }
        };
        stateFade.prototype.step2 = function (_thisState) {
            this.game.state.start(this._toState);
            this.game.state.states[this._toState].init = function () { return _thisState.hideTiles(); };
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
    var slide1 = (function (_super) {
        __extends(slide1, _super);
        function slide1() {
            return _super.call(this) || this;
        }
        slide1.prototype.init = function () { console.log("intro init 1"); };
        slide1.prototype.preload = function () { console.log("intro preload 1"); };
        slide1.prototype.create = function () {
            var _this = this;
            this.game.world.setBounds(0, 0, 1024, 768);
            this.game.add.image(0, 0, "bg1");
            this.francesco = this.game.add.sprite(0, 0, 'francesco');
            this.francesco.anchor.set(.5);
            this.francesco.scale.set(2);
            this.francesco.x = this.game.world.centerX;
            this.francesco.y = this.game.world.centerY + 168;
            this._animations = [];
            this._animations.push(this.francesco.animations.add("idle", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 9, false, true));
            this._animations[0].onComplete.add(function () { return _this.randomAnim(); }, this);
            this._animations.push(this.francesco.animations.add('barba', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 13, 14, 14, 15, 15, 14, 14, 15, 15, 14, 14, 13, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 9, false, true));
            this._animations[1].onComplete.add(function () { return _this.randomAnim(); }, this);
            this._animations.push(this.francesco.animations.add('occhi', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,], 9, false, true));
            this._animations[2].onComplete.add(function () { return _this.randomAnim(); }, this);
            this._animations.push(this.francesco.animations.add('gratta', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 17, 18, 18, 19, 19, 18, 18, 19, 19, 18, 18, 17, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 9, false, true));
            this._animations[3].onComplete.add(function () { return _this.randomAnim(); }, this);
            this._animations.push(this.francesco.animations.add('smile', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 9, false, true));
            this._animations[4].onComplete.add(function () { return _this.randomAnim(); }, this);
            this._animations.push(this.francesco.animations.add('sinistra', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 9, false, true));
            this._animations[5].onComplete.add(function () { return _this.randomAnim(); }, this);
            this._animations.push(this.francesco.animations.add('sinistraLow', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 9, false, true));
            this._animations[6].onComplete.add(function () { return _this.randomAnim(); }, this);
            this._animations.push(this.francesco.animations.add('destra', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 8, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 9, false, true));
            this._animations[7].onComplete.add(function () { return _this.randomAnim(); }, this);
            this._animations.push(this.francesco.animations.add('destraLow', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 9, false, true));
            this._animations[8].onComplete.add(function () { return _this.randomAnim(); }, this);
            this._animations.push(this.francesco.animations.add('nono', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 7, 7, 0, 4, 4, 0, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 9, false, true));
            this._animations[9].onComplete.add(function () { return _this.randomAnim(); }, this);
            this.randomAnim();
        };
        slide1.prototype.randomAnim = function () {
            this._animations[this.game.rnd.integerInRange(0, 9)].play();
        };
        slide1.prototype.update = function () { };
        return slide1;
    }(Phaser.State));
    core.slide1 = slide1;
})(core || (core = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>
var core;
(function (core) {
    var slide10 = (function (_super) {
        __extends(slide10, _super);
        function slide10() {
            return _super.call(this) || this;
        }
        slide10.prototype.init = function () { console.log("intro init 10"); };
        slide10.prototype.preload = function () { this.game.add.image(0, 0, "bg10"); };
        slide10.prototype.create = function () { console.log("intro create 10"); };
        slide10.prototype.update = function () { };
        return slide10;
    }(Phaser.State));
    core.slide10 = slide10;
})(core || (core = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>
var core;
(function (core) {
    var slide11 = (function (_super) {
        __extends(slide11, _super);
        function slide11() {
            return _super.call(this) || this;
        }
        slide11.prototype.init = function () { console.log("intro init 11"); };
        slide11.prototype.preload = function () { this.game.add.image(0, 0, "bg11"); };
        slide11.prototype.create = function () { console.log("intro create 11"); };
        slide11.prototype.update = function () { };
        return slide11;
    }(Phaser.State));
    core.slide11 = slide11;
})(core || (core = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>
var core;
(function (core) {
    var slide12 = (function (_super) {
        __extends(slide12, _super);
        function slide12() {
            return _super.call(this) || this;
        }
        slide12.prototype.init = function () { console.log("intro init 12"); };
        slide12.prototype.preload = function () { this.game.add.image(0, 0, "bg12"); };
        slide12.prototype.create = function () { console.log("intro create 12"); };
        slide12.prototype.update = function () { };
        return slide12;
    }(Phaser.State));
    core.slide12 = slide12;
})(core || (core = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>
var core;
(function (core) {
    var slide13 = (function (_super) {
        __extends(slide13, _super);
        function slide13() {
            return _super.call(this) || this;
        }
        slide13.prototype.init = function () { console.log("intro init 13"); };
        slide13.prototype.preload = function () { this.game.add.image(0, 0, "bg13"); };
        slide13.prototype.create = function () { console.log("intro create 13"); };
        slide13.prototype.update = function () { };
        return slide13;
    }(Phaser.State));
    core.slide13 = slide13;
})(core || (core = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>
var core;
(function (core) {
    var slide14 = (function (_super) {
        __extends(slide14, _super);
        function slide14() {
            return _super.call(this) || this;
        }
        slide14.prototype.init = function () { console.log("intro init 14"); };
        slide14.prototype.preload = function () { this.game.add.image(0, 0, "bg14"); };
        slide14.prototype.create = function () { console.log("intro create 14"); };
        slide14.prototype.update = function () { };
        return slide14;
    }(Phaser.State));
    core.slide14 = slide14;
})(core || (core = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>
var core;
(function (core) {
    var slide15 = (function (_super) {
        __extends(slide15, _super);
        function slide15() {
            return _super.call(this) || this;
        }
        slide15.prototype.init = function () { console.log("intro init 15"); };
        slide15.prototype.preload = function () { this.game.add.image(0, 0, "bg15"); };
        slide15.prototype.create = function () { console.log("intro create 15"); };
        slide15.prototype.update = function () { };
        return slide15;
    }(Phaser.State));
    core.slide15 = slide15;
})(core || (core = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>
var core;
(function (core) {
    var slide16 = (function (_super) {
        __extends(slide16, _super);
        function slide16() {
            return _super.call(this) || this;
        }
        slide16.prototype.create = function () {
            this.isStarted = false;
            this.game.physics.arcade.gravity.y = 400;
            this.game.world.setBounds(0, 0, 10000, 768);
            this.game.camera.x = 0;
            this.bg = this.game.add.tileSprite(-100, 0, 1200, 768, 'bgGame');
            this.bg.fixedToCamera = true;
            if (core.isMobile(this.game)) {
                this.game.input.onDown.addOnce(this.startGame, this);
            }
            else {
                this.flapKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                this.flapKey.onDown.addOnce(this.startGame, this);
                this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
            }
        };
        slide16.prototype.startGame = function () {
            this.isStarted = true;
        };
        slide16.prototype.render = function () {
            this.game.debug.cameraInfo(this.game.camera, 32, 32);
        };
        slide16.prototype.update = function () {
            if (this.isStarted) {
                this.bg.tilePosition.x -= 1.5;
            }
        };
        return slide16;
    }(Phaser.State));
    core.slide16 = slide16;
})(core || (core = {}));
/// &lt;reference path="../lib/phaser.d.ts"/&gt;
var core;
(function (core) {
    var slide17 = (function (_super) {
        __extends(slide17, _super);
        function slide17() {
            return _super.call(this) || this;
        }
        slide17.prototype.create = function () {
            this.isStarted = false;
            this.playerStart = null;
            this.game.physics.arcade.gravity.y = 400;
            this.game.world.setBounds(0, 0, 52000, 768);
            this.game.camera.x = 0;
            this.bg = this.game.add.tileSprite(-100, 0, 1200, 768, 'bgGame');
            this.bg.fixedToCamera = true;
            this.player = new core.Player(this.game, this);
            this.player.play("idle");
            this.idleTween = this.game.add.tween(this.player).to({ y: this.player.y - 50 }, 1000, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
            this.game.camera.follow(this.player);
            this.game.camera.deadzone = new Phaser.Rectangle(0, 0, 100, 768);
            if (core.isMobile(this.game)) {
                this.game.input.onDown.addOnce(this.startGame, this);
                this.game.input.onDown.add(this.player.flap, this.player);
            }
            else {
                this.flapKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                this.flapKey.onDown.addOnce(this.startGame, this);
                this.flapKey.onDown.add(this.player.flap, this.player);
                this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
            }
        };
        slide17.prototype.startGame = function () {
            this.player.body.allowGravity = true;
            this.player.alive = true;
            this.player.flap();
            this.player.body.velocity.x = 100;
            if (this.playerStart != null)
                this.player.x = this.playerStart;
            this.idleTween.pause();
            this.isStarted = true;
        };
        slide17.prototype.render = function () {
            this.game.debug.cameraInfo(this.game.camera, 32, 32);
            this.game.debug.bodyInfo(this.player, 32, 132);
        };
        slide17.prototype.update = function () {
            if (this.isStarted) {
                this.bg.tilePosition.x -= 1.5;
            }
        };
        return slide17;
    }(Phaser.State));
    core.slide17 = slide17;
})(core || (core = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>
var core;
(function (core) {
    var slide18 = (function (_super) {
        __extends(slide18, _super);
        function slide18() {
            return _super.call(this) || this;
        }
        slide18.prototype.preload = function () { };
        slide18.prototype.create = function () {
            this.isStarted = false;
            this.playerStart = null;
            this.game.physics.arcade.gravity.y = 400;
            this.game.world.setBounds(0, 0, 52000, 768);
            this.game.camera.x = 0;
            this.bg = this.game.add.tileSprite(-100, 0, 1200, 768, 'bgGame');
            this.bg.fixedToCamera = true;
            this.colliderGroup = this.game.add.group();
            this.player = new core.Player(this.game, this);
            this.player.play("idle");
            this.idleTween = this.game.add.tween(this.player).to({ y: this.player.y - 50 }, 1000, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
            this.game.camera.follow(this.player);
            this.game.camera.deadzone = new Phaser.Rectangle(0, 0, 100, 768);
            if (core.isMobile(this.game)) {
                this.game.input.onDown.addOnce(this.startGame, this);
                this.game.input.onDown.add(this.player.flap, this.player);
            }
            else {
                this.flapKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                this.flapKey.onDown.addOnce(this.startGame, this);
                this.flapKey.onDown.add(this.player.flap, this.player);
                this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
            }
            this.colliderTop = this.game.add.sprite(0, 0, this.game.cache.getBitmapData('collider'));
            this.game.physics.arcade.enable(this.colliderTop);
            this.colliderTop.name = "colliderTop";
            this.colliderTop.body.immovable = true;
            this.colliderTop.fixedToCamera = true;
            this.colliderTop.visible = true;
            this.colliderTop.body.allowGravity = false;
            this.colliderGroup.add(this.colliderTop);
            this.colliderBottom = this.game.add.sprite(0, 748, this.game.cache.getBitmapData('collider'));
            this.game.physics.arcade.enable(this.colliderBottom);
            this.colliderBottom.name = "colliderBottom";
            this.colliderBottom.body.immovable = true;
            this.colliderBottom.fixedToCamera = true;
            this.colliderBottom.visible = true;
            this.colliderBottom.body.allowGravity = false;
            this.colliderGroup.add(this.colliderBottom);
        };
        slide18.prototype.startGame = function () {
            this.player.body.allowGravity = true;
            this.player.play("fly");
            this.player.alive = true;
            this.player.flap();
            this.player.body.velocity.x = 100;
            if (this.playerStart != null)
                this.player.x = this.playerStart;
            this.idleTween.pause();
            this.isStarted = true;
        };
        slide18.prototype.render = function () {
            this.game.debug.cameraInfo(this.game.camera, 32, 32);
            this.game.debug.bodyInfo(this.player, 32, 132);
        };
        slide18.prototype.update = function () {
            if (this.isStarted) {
                this.bg.tilePosition.x -= 1.5;
                this.game.physics.arcade.overlap(this.colliderGroup, this.player, this.collisionHandlerBounds, null, this);
            }
        };
        slide18.prototype.collisionHandlerBounds = function (_player, _bound) { _player.kill(); };
        return slide18;
    }(Phaser.State));
    core.slide18 = slide18;
})(core || (core = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>
var core;
(function (core) {
    var slide19 = (function (_super) {
        __extends(slide19, _super);
        function slide19() {
            return _super.call(this) || this;
        }
        slide19.prototype.preload = function () { };
        slide19.prototype.create = function () {
            this.isStarted = false;
            this.playerStart = null;
            this.game.physics.arcade.gravity.y = 400;
            this.game.world.setBounds(0, 0, 52000, 768);
            this.game.camera.x = 0;
            this.randomEnemySpawnTime = this.game.time.now;
            this.bombSpawn = 100;
            this.backgroundGroup = this.game.add.group();
            this.enemyGroup = this.game.add.group();
            this.colliderGroup = this.game.add.group();
            this.bg = this.game.add.tileSprite(-100, 0, 1200, 768, 'bgGame');
            this.bg.fixedToCamera = true;
            this.backgroundGroup.add(this.bg);
            this.player = new core.Player(this.game, this);
            this.player.play("idle");
            this.idleTween = this.game.add.tween(this.player).to({ y: this.player.y - 50 }, 1000, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
            this.game.camera.follow(this.player);
            this.game.camera.deadzone = new Phaser.Rectangle(0, 0, 100, 768);
            if (core.isMobile(this.game)) {
                this.game.input.onDown.addOnce(this.startGame, this);
                this.game.input.onDown.add(this.player.flap, this.player);
            }
            else {
                this.flapKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                this.flapKey.onDown.addOnce(this.startGame, this);
                this.flapKey.onDown.add(this.player.flap, this.player);
                this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
            }
            this.colliderTop = this.game.add.sprite(0, 0, this.game.cache.getBitmapData('collider'));
            this.game.physics.arcade.enable(this.colliderTop);
            this.colliderTop.name = "colliderTop";
            this.colliderTop.body.immovable = true;
            this.colliderTop.fixedToCamera = true;
            this.colliderTop.visible = true;
            this.colliderTop.body.allowGravity = false;
            this.colliderGroup.add(this.colliderTop);
            this.colliderBottom = this.game.add.sprite(0, 748, this.game.cache.getBitmapData('collider'));
            this.game.physics.arcade.enable(this.colliderBottom);
            this.colliderBottom.name = "colliderBottom";
            this.colliderBottom.body.immovable = true;
            this.colliderBottom.fixedToCamera = true;
            this.colliderBottom.visible = true;
            this.colliderBottom.body.allowGravity = false;
            this.colliderGroup.add(this.colliderBottom);
        };
        slide19.prototype.startGame = function () {
            this.player.body.allowGravity = true;
            this.player.play("fly");
            this.player.alive = true;
            this.player.flap();
            this.player.body.velocity.x = 100;
            if (this.playerStart != null)
                this.player.x = this.playerStart;
            this.idleTween.pause();
            this.isStarted = true;
        };
        slide19.prototype.render = function () {
            this.game.debug.cameraInfo(this.game.camera, 32, 32);
            this.game.debug.bodyInfo(this.player, 32, 132);
        };
        slide19.prototype.update = function () {
            if (this.isStarted) {
                this.bg.tilePosition.x -= 1.5;
                this.game.physics.arcade.overlap(this.enemyGroup, this.player, this.collisionHandlerEnemy, null, this);
                this.game.physics.arcade.overlap(this.colliderGroup, this.player, this.collisionHandlerBounds, null, this);
                this.spawnEnemyBomb();
            }
        };
        slide19.prototype.collisionHandlerBounds = function (_player, _bound) { _player.kill(); };
        slide19.prototype.collisionHandlerEnemy = function (_player, _enemy) {
            _player.kill();
            _enemy.removeEnemy();
        };
        slide19.prototype.spawnEnemyBomb = function () {
            if (this.randomEnemySpawnTime < this.game.time.now) {
                this.randomEnemySpawnTime = this.game.time.now + Math.abs(this.game.rnd.integerInRange(10, 20) * this.bombSpawn);
                this.enemyGroup.add(new core.Bomb(this.game, this));
            }
        };
        return slide19;
    }(Phaser.State));
    core.slide19 = slide19;
})(core || (core = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>
var core;
(function (core) {
    var slide2 = (function (_super) {
        __extends(slide2, _super);
        function slide2() {
            return _super.call(this) || this;
        }
        slide2.prototype.init = function () { console.log("intro init 2"); };
        slide2.prototype.preload = function () { this.game.add.image(0, 0, "bg2"); };
        slide2.prototype.create = function () {
            this.game.physics.arcade.gravity.y = 0;
            this.game.world.setBounds(0, 0, 1024, 768);
            this.groups = [];
            for (var g = 0; g < 4; g++)
                this.groups.push(this.game.add.group());
            new core.PlayerFake(this.game, 0, 440);
            new core.PlayerFake(this.game, 1, 460);
            new core.PlayerFake(this.game, 2, 480);
            new core.PlayerFake(this.game, 3, 500);
            new core.mummy(this.game, -400, 470);
            var _mummy;
            var _z = 0;
            var _y = 0;
            for (var i = 0; i < 50; i++) {
                switch (_z) {
                    case 0:
                        _y = this.game.rnd.integerInRange(440, 459);
                        break;
                    case 1:
                        _y = this.game.rnd.integerInRange(460, 479);
                        break;
                    case 2:
                        _y = this.game.rnd.integerInRange(480, 499);
                        break;
                    case 3:
                        _y = this.game.rnd.integerInRange(500, 520);
                        break;
                }
                _mummy = new core.mummy(this.game, -1000 - (i * 50) + (this.game.rnd.realInRange(-20, 20)), _y);
                this.groups[_z].add(_mummy);
                _z++;
                if (_z == 4)
                    _z = 0;
            }
        };
        slide2.prototype.update = function () { };
        return slide2;
    }(Phaser.State));
    core.slide2 = slide2;
})(core || (core = {}));
(function (core) {
    var PlayerFake = (function (_super) {
        __extends(PlayerFake, _super);
        function PlayerFake(game, avatar, _y) {
            var _this = _super.call(this, game, 0, _y, "players") || this;
            _this.scale.set(2);
            _this.anchor.setTo(0.5, 1);
            _this.game.physics.arcade.enableBody(_this);
            _this.x = _this.game.rnd.realInRange(-200, -300);
            var frames = [
                [[0, 1, 2, 3, 4, 5, 6, 7], [8, 9, 10, 11, 12, 13]],
                [[14, 15, 16, 17, 18, 19, 20, 21], [22, 23, 24, 25, 26, 27]],
                [[28, 29, 30, 31, 32, 33, 34, 35], [36, 37, 38, 39]],
                [[42, 43, 44, 45, 46, 47, 48, 49], [50, 51, 52, 53]]
            ];
            _this.anim = [];
            var anim = _this.animations.add("idle", frames[avatar][1], 5 + (game.rnd.integerInRange(1, 3)), true);
            _this.anim.push(anim);
            anim = _this.animations.add("run", frames[avatar][0], 10 + (game.rnd.integerInRange(1, 3)), true);
            _this.anim.push(anim);
            anim.play();
            _this.vel = game.rnd.realInRange(2, 4);
            _this.game.add.existing(_this);
            return _this;
        }
        PlayerFake.prototype.update = function () {
            this.x += this.vel;
            if (this.x > 1200) {
                this.kill();
            }
        };
        return PlayerFake;
    }(Phaser.Sprite));
    core.PlayerFake = PlayerFake;
})(core || (core = {}));
(function (core) {
    var mummy = (function (_super) {
        __extends(mummy, _super);
        function mummy(game, startX, startY) {
            var _this = _super.call(this, game, startX, startY, "mummy") || this;
            _this.scale.set(3);
            _this.anchor.setTo(0.5, 1);
            _this.x = startX;
            _this.game.physics.arcade.enableBody(_this);
            _this.animations.add("walk").play(_this.game.rnd.realInRange(9, 11), true, false);
            _this.game.add.existing(_this);
            return _this;
        }
        mummy.prototype.update = function () {
            this.x += this.game.rnd.realInRange(1, 2);
            if (this.x > 1200) {
                this.kill();
            }
        };
        return mummy;
    }(Phaser.Sprite));
    core.mummy = mummy;
})(core || (core = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>
var core;
(function (core) {
    var slide20 = (function (_super) {
        __extends(slide20, _super);
        function slide20() {
            return _super.call(this) || this;
        }
        slide20.prototype.init = function () { console.log("intro init 20"); };
        slide20.prototype.preload = function () { this.game.add.image(0, 0, "bg20"); };
        slide20.prototype.create = function () { console.log("intro create 20"); };
        slide20.prototype.update = function () { };
        return slide20;
    }(Phaser.State));
    core.slide20 = slide20;
})(core || (core = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>
var core;
(function (core) {
    var slide21 = (function (_super) {
        __extends(slide21, _super);
        function slide21() {
            return _super.call(this) || this;
        }
        slide21.prototype.init = function () { console.log("intro init 20"); };
        slide21.prototype.preload = function () { this.game.add.image(0, 0, "bg21"); };
        slide21.prototype.create = function () { console.log("intro create 20"); };
        slide21.prototype.update = function () { };
        return slide21;
    }(Phaser.State));
    core.slide21 = slide21;
})(core || (core = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>
var core;
(function (core) {
    var slide22 = (function (_super) {
        __extends(slide22, _super);
        function slide22() {
            return _super.call(this) || this;
        }
        slide22.prototype.init = function () { console.log("intro init 20"); };
        slide22.prototype.preload = function () { this.game.add.image(0, 0, "bg22"); };
        slide22.prototype.create = function () { console.log("intro create 20"); };
        slide22.prototype.update = function () { };
        return slide22;
    }(Phaser.State));
    core.slide22 = slide22;
})(core || (core = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>
var core;
(function (core) {
    var slide23 = (function (_super) {
        __extends(slide23, _super);
        function slide23() {
            return _super.call(this) || this;
        }
        slide23.prototype.init = function () { console.log("intro init 20"); };
        slide23.prototype.preload = function () { this.game.add.image(0, 0, "bg23"); };
        slide23.prototype.create = function () { console.log("intro create 20"); };
        slide23.prototype.update = function () { };
        return slide23;
    }(Phaser.State));
    core.slide23 = slide23;
})(core || (core = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>
var core;
(function (core) {
    var slide24 = (function (_super) {
        __extends(slide24, _super);
        function slide24() {
            return _super.call(this) || this;
        }
        slide24.prototype.init = function () { console.log("intro init 20"); };
        slide24.prototype.preload = function () { this.game.add.image(0, 0, "bg24"); };
        slide24.prototype.create = function () { console.log("intro create 20"); };
        slide24.prototype.update = function () { };
        return slide24;
    }(Phaser.State));
    core.slide24 = slide24;
})(core || (core = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>
var core;
(function (core) {
    var slide25 = (function (_super) {
        __extends(slide25, _super);
        function slide25() {
            return _super.call(this) || this;
        }
        slide25.prototype.init = function () { console.log("intro init 20"); };
        slide25.prototype.preload = function () { this.game.add.image(0, 0, "bg25"); };
        slide25.prototype.create = function () { console.log("intro create 20"); };
        slide25.prototype.update = function () { };
        return slide25;
    }(Phaser.State));
    core.slide25 = slide25;
})(core || (core = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>
var core;
(function (core) {
    var slide26 = (function (_super) {
        __extends(slide26, _super);
        function slide26() {
            return _super.call(this) || this;
        }
        slide26.prototype.init = function () { console.log("intro init 20"); };
        slide26.prototype.preload = function () { this.game.add.image(0, 0, "bg26"); };
        slide26.prototype.create = function () { console.log("intro create 20"); };
        slide26.prototype.update = function () { };
        return slide26;
    }(Phaser.State));
    core.slide26 = slide26;
})(core || (core = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>
var core;
(function (core) {
    var slide27 = (function (_super) {
        __extends(slide27, _super);
        function slide27() {
            return _super.call(this) || this;
        }
        slide27.prototype.init = function () { console.log("intro init 20"); };
        slide27.prototype.preload = function () { this.game.add.image(0, 0, "bg27"); };
        slide27.prototype.create = function () { console.log("intro create 20"); };
        slide27.prototype.update = function () { };
        return slide27;
    }(Phaser.State));
    core.slide27 = slide27;
})(core || (core = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>
var core;
(function (core) {
    var slide28 = (function (_super) {
        __extends(slide28, _super);
        function slide28() {
            return _super.call(this) || this;
        }
        slide28.prototype.init = function () { console.log("intro init 20"); };
        slide28.prototype.preload = function () { this.game.add.image(0, 0, "bg28"); };
        slide28.prototype.create = function () { console.log("intro create 20"); };
        slide28.prototype.update = function () { };
        return slide28;
    }(Phaser.State));
    core.slide28 = slide28;
})(core || (core = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>
var core;
(function (core) {
    var slide3 = (function (_super) {
        __extends(slide3, _super);
        function slide3() {
            return _super.call(this) || this;
        }
        slide3.prototype.init = function () { console.log("intro init 3"); };
        slide3.prototype.preload = function () { this.game.add.image(0, 0, "bg3"); };
        slide3.prototype.create = function () { console.log("intro create 3"); };
        slide3.prototype.update = function () { };
        return slide3;
    }(Phaser.State));
    core.slide3 = slide3;
})(core || (core = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>
var core;
(function (core) {
    var slide4 = (function (_super) {
        __extends(slide4, _super);
        function slide4() {
            return _super.call(this) || this;
        }
        slide4.prototype.init = function () { console.log("intro init 4"); };
        slide4.prototype.preload = function () { this.game.add.image(0, 0, "bg4"); };
        slide4.prototype.create = function () { console.log("intro create 4"); };
        slide4.prototype.update = function () { };
        return slide4;
    }(Phaser.State));
    core.slide4 = slide4;
})(core || (core = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>
var core;
(function (core) {
    var slide5 = (function (_super) {
        __extends(slide5, _super);
        function slide5() {
            return _super.call(this) || this;
        }
        slide5.prototype.init = function () { console.log("intro init 5"); };
        slide5.prototype.preload = function () { this.game.add.image(0, 0, "bg5"); };
        slide5.prototype.create = function () { console.log("intro create 5"); };
        slide5.prototype.update = function () { };
        return slide5;
    }(Phaser.State));
    core.slide5 = slide5;
})(core || (core = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>
var core;
(function (core) {
    var slide6 = (function (_super) {
        __extends(slide6, _super);
        function slide6() {
            return _super.call(this) || this;
        }
        slide6.prototype.init = function () { console.log("intro init 6"); };
        slide6.prototype.preload = function () { this.game.add.image(0, 0, "bg6"); };
        slide6.prototype.create = function () { console.log("intro create 6"); };
        slide6.prototype.update = function () { };
        return slide6;
    }(Phaser.State));
    core.slide6 = slide6;
})(core || (core = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>
var core;
(function (core) {
    var slide7 = (function (_super) {
        __extends(slide7, _super);
        function slide7() {
            return _super.call(this) || this;
        }
        slide7.prototype.init = function () { console.log("intro init 7"); };
        slide7.prototype.preload = function () { this.game.add.image(0, 0, "bg7"); };
        slide7.prototype.create = function () { console.log("intro create 7"); };
        slide7.prototype.update = function () { };
        return slide7;
    }(Phaser.State));
    core.slide7 = slide7;
})(core || (core = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>
var core;
(function (core) {
    var slide8 = (function (_super) {
        __extends(slide8, _super);
        function slide8() {
            return _super.call(this) || this;
        }
        slide8.prototype.init = function () { console.log("intro init 8"); };
        slide8.prototype.preload = function () { this.game.add.image(0, 0, "bg8"); };
        slide8.prototype.create = function () { console.log("intro create 8"); };
        slide8.prototype.update = function () { };
        return slide8;
    }(Phaser.State));
    core.slide8 = slide8;
})(core || (core = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../core.ts"/>
var core;
(function (core) {
    var slide9 = (function (_super) {
        __extends(slide9, _super);
        function slide9() {
            return _super.call(this) || this;
        }
        slide9.prototype.init = function () { console.log("intro init 9"); };
        slide9.prototype.preload = function () { this.game.add.image(0, 0, "bg9"); };
        slide9.prototype.create = function () { console.log("intro create 9"); };
        slide9.prototype.update = function () { };
        return slide9;
    }(Phaser.State));
    core.slide9 = slide9;
})(core || (core = {}));
var core;
(function (core) {
    var boot = (function (_super) {
        __extends(boot, _super);
        function boot() {
            return _super !== null && _super.apply(this, arguments) || this;
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
            bmd = this.game.add.bitmapData(1024, 20);
            bmd.ctx.fillStyle = '#00ff00';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 1024, 20);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('collider', bmd);
            bmd = this.game.add.bitmapData(100, 100);
            bmd.ctx.fillStyle = '#ff0000';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 100, 100);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('enemy', bmd);
            bmd = this.game.add.bitmapData(100, 100);
            bmd.ctx.fillStyle = '#0000ff';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 100, 100);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('player', bmd);
            bmd = this.game.add.bitmapData(100, 100);
            bmd.ctx.fillStyle = '#000000';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 100, 100);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('fade', bmd);
        };
        boot.prototype.create = function () {
            this.game.stage.backgroundColor = '#ffffff';
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
            return _super !== null && _super.apply(this, arguments) || this;
        }
        preloader.prototype.preload = function () {
            var _this = this;
            try {
                this.game.load.onLoadStart.add(function () { }, this);
                this.game.load.onFileStart.add(function () { }, this);
                this.game.load.onFileError.add(function (filekey, file) { }, this);
                this.game.load.onFileComplete.add(this.fileComplete, this);
                this.game.load.onLoadComplete.add(function () {
                    _this.loadingBar.visible = false;
                    _this.loadingPerc.visible = false;
                    _this.startBtn.visible = true;
                    _this.game.input.onDown.addOnce(_this.startGame, _this);
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
                for (var i = 0; i < core.gameData.assets.images.length; i++) {
                    this.game.load.image(core.gameData.assets.images[i].name, core.gameData.assets.images[i].path);
                }
                // SPRITESHEETS		
                for (var i = 0; i < core.gameData.assets.spritesheets.length; i++) {
                    this.game.load.spritesheet(core.gameData.assets.spritesheets[i].name, core.gameData.assets.spritesheets[i].path, core.gameData.assets.spritesheets[i].width, core.gameData.assets.spritesheets[i].height, core.gameData.assets.spritesheets[i].frames);
                }
                //bitmap fonts
                for (var i = 0; i < core.gameData.assets.bitmapfont.length; i++) {
                    this.game.load.bitmapFont(core.gameData.assets.bitmapfont[i].name, core.gameData.assets.bitmapfont[i].imgpath, core.gameData.assets.bitmapfont[i].xmlpath);
                }
                // SOUNDS		
                for (var i = 0; i < core.gameData.assets.sounds.length; i++) {
                    this.game.load.audio(core.gameData.assets.sounds[i].name, core.gameData.assets.sounds[i].paths);
                }
                //this.game.load.script('webfont', '/js/libs/webfont.js');
            }
            catch (err) { }
        };
        preloader.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
            try {
                this.loadingPerc.text = progress + "%";
            }
            catch (err) { }
        };
        preloader.prototype.startGame = function () {
            core.goState(core.presentationData.slides[0].state, core.fadeType.RANDOM, this.game);
        };
        return preloader;
    }(Phaser.State));
    core.preloader = preloader;
})(core || (core = {}));
