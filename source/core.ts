/// <reference path="lib/phaser.d.ts"/>

var WebFontConfig = {
    active: function () { },
    google: {
        families: ['Press Start 2P']
    }

};

module core {

   
    
    export let _textClass: Array<string> = ["normal","medium","big"];

    //export let _newPresentation: initPresentation;
    export let _slidesContainer: HTMLElement;
    export let _slides: HTMLElement;
    export let _codeContainer: HTMLElement;
    export let _code: HTMLElement;
    export let _presentationMenu: HTMLElement;
    export let _game: Phaser.Game;
    export let _currentIndex: number;
    export let _slidesBtn: HTMLElement;
    export let _nextBtn: HTMLElement;
    export let _prevBtn: HTMLElement;
    export let _codeBtn: HTMLElement;
    export let _textBtn: HTMLElement;
    export let _fontSize: number = 0;
    
    export let _fullscreenBtn: HTMLElement;
    export let st:core.stateFade;

    export function isMobile(game: Phaser.Game): boolean {

        if (game.device.touch && (game.device.iOS || game.device.android || game.device.windowsPhone)) {
            return true;
        }
        else {
            return false;
        }
    }

    export function loadCode (_file:string){
		
  		 var xhr = new XMLHttpRequest();
  		 xhr.onreadystatechange = (e) => {
		 if(xhr.readyState == 4) {  _code.innerHTML = xhr.responseText;
         
          hljs.highlightBlock(_code);
     }
     										};
		 let _path:string="data/"+_file+".html";
		 xhr.open("GET",_path, true);
		 xhr.setRequestHeader('Content-type', 'text/html');
		 xhr.send();
		
		}

    export function setCurrentIndex(_state: string): void {

        let _index = 0;
        presentationData.slides.forEach(element => {

            if (element.state === _state) { _currentIndex = _index; }
            _index++;

        });
    }

    export function setResize(): void {
        _slidesContainer.style.height = window.innerHeight + "px";
        _slidesContainer.style.width = window.innerWidth + "px";
        _codeContainer.style.height = window.innerHeight + "px";
        //_codeContainer.style.width = window.innerWidth + "px";
    }

    export function goState(_state: string, _type: fadeType, _game: Phaser.Game): void {

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

    export function setUpSlide(_state:string){

       
            let _obj:{title:string,state:string,preview:string,code:string}=presentationData.slides[_currentIndex];
            _code.innerHTML="";

            if(_obj.code!="") {loadCode(_obj.code); _codeBtn.className="menuBtn"; }else{ _codeBtn.className="menuBtn disabled"; }


            if ((_currentIndex + 1) >= presentationData.slides.length) { _nextBtn.className="menuBtn disabled";}else{_nextBtn.className="menuBtn";}

            if ((_currentIndex - 1) == -1) { _prevBtn.className="menuBtn disabled";}else{ _prevBtn.className="menuBtn";}


            

    }


    class initPresentation {


        constructor(width?: number, height?: number) {

            let dpr: number = 1;
            _currentIndex = 0;

            if (devicePixelRatio != undefined) {
                dpr = devicePixelRatio || 1;

                if (!width) {
                    width = screen.width * dpr;
                }
                if (!height) {
                    height = screen.height * dpr;
                }

            }

            _game = new Phaser.Game(width, height, Phaser.AUTO, "", null, false, false);

            _game.state.add("boot", boot, false);
            _game.state.add("preloader", preloader, false);
            _game.state.add("slide1", slide1, false);
            _game.state.add("slide2", slide2, false);
            _game.state.add("slide3", slide3, false);
            _game.state.add("slide4", slide4, false);
            _game.state.add("slide5", slide5, false);
            _game.state.add("slide6", slide6, false);
            _game.state.add("slide7", slide7, false);
            _game.state.add("slide8", slide8, false);
            _game.state.add("slide9", slide9, false);
            _game.state.add("slide10", slide10, false);
            _game.state.add("slide11", slide11, false);
            _game.state.add("slide12", slide12, false);
            _game.state.add("slide13", slide13, false);
            _game.state.add("slide14", slide14, false);
            _game.state.add("slide15", slide15, false);
            _game.state.add("slide16", slide16, false);
            _game.state.add("slide17", slide17, false);
            _game.state.add("slide18", slide18, false);
            _game.state.add("slide19", slide19, false);
            _game.state.add("slide20", slide20, false);
            _game.state.add("slide21", slide21, false);
            _game.state.add("slide22", slide22, false);
            _game.state.add("slide23", slide23, false);
            _game.state.add("slide24", slide24, false);
            _game.state.add("slide25", slide25, false);
            _game.state.add("slide26", slide26, false);
            _game.state.add("slide27", slide27, false);
            _game.state.add("slide28", slide28, false);
            _game.state.start("boot");


            _presentationMenu = document.getElementById("presentationMenu");
            _slidesContainer = document.getElementById("slidesContainer");
            _codeContainer = document.getElementById("codeContainer");
            _slides = document.getElementById("slides");
            _code = document.getElementById("code");

            

            let mString: string;
            let mElement: HTMLElement;
            presentationData.slides.forEach(element => {

                mElement = document.createElement("div");
                mElement.id = element.state;
                mElement.className = "mSlide";
                mElement.innerHTML = "<div style='background-image:url(" + element.preview + ");' class='mImage'></div><div class='mTitle'>" + element.title + "</div></div>"

                mElement.addEventListener("click", () => {
                    _slidesContainer.className = "hide";
                    setCurrentIndex(element.state);
                    goState(element.state, fadeType.RANDOM, _game);
                   
                }

                );

                _slides.appendChild(mElement);

            });

            _slidesBtn = document.createElement("div");
            _slidesBtn.id = "slidesBtn";
            _slidesBtn.className = "menuBtn";
            _slidesBtn.addEventListener("click", () => this.toggleSlides());
            _presentationMenu.appendChild(_slidesBtn);

            _prevBtn = document.createElement("div");
            _prevBtn.id = "prevBtn";
            _prevBtn.className = "menuBtn disabled";
            _prevBtn.addEventListener("click", () => this.prevState());
            _presentationMenu.appendChild(_prevBtn);

            _nextBtn = document.createElement("div");
            _nextBtn.id = "nextBtn";
            _nextBtn.className = "menuBtn disabled";
            _nextBtn.addEventListener("click", () => this.nextState());
            _presentationMenu.appendChild(_nextBtn);

            _codeBtn = document.createElement("div");
            _codeBtn.id = "codeBtn";
            _codeBtn.className = "menuBtn disabled";
            _codeBtn.addEventListener("click", () => this.toggleCode());
            _presentationMenu.appendChild(_codeBtn);

            _textBtn = document.createElement("div");
            _textBtn.id = "textBtn";
            _textBtn.className = "menuBtn hide";
            _textBtn.addEventListener("click", () => this.toggleFontSize());
            _presentationMenu.appendChild(_textBtn);


            _fullscreenBtn = document.createElement("div");
            _fullscreenBtn.id = "fullscreenBtn";
            _fullscreenBtn.className = "menuBtn";
            _fullscreenBtn.addEventListener("click", () => this.toggleFullScreen());
            _presentationMenu.appendChild(_fullscreenBtn);

            

            window.onkeyup = (e) => {
                let key = e.keyCode ? e.keyCode : e.which;

                if (key == 39) {
                    this.nextState();
                }else if (key == 37) {
                    this.prevState();
                }
}

            setResize();

        }

        toggleSlides(): void {
            if (_slidesContainer.className === "") { _slidesContainer.className = "hide" } else { _slidesContainer.className = "" }

        }

         toggleFontSize(): void {
          
            _fontSize++;
            if (_fontSize==3) _fontSize=0;

            _code.className="typescript "+ _textClass[_fontSize]+ " hljs"; 


        }

        toggleCode(): void {
            if (_codeContainer.className === "") { 
                _codeContainer.className = "hide";
                _textBtn.className="menuBtn hide";
        } else {

                _codeContainer.className = "";
                _textBtn.className="menuBtn";
            }

        }

        toggleFullScreen() {
            if ((document.fullScreenElement && document.fullScreenElement !== null) ||
                (!document.mozFullScreen && !document.webkitIsFullScreen)) {

                    _fullscreenBtn.className="menuBtn active";

                if (document.documentElement.requestFullScreen) {
                    document.documentElement.requestFullScreen();
                } else if (document.documentElement.mozRequestFullScreen) {
                    document.documentElement.mozRequestFullScreen();
                } else if (document.documentElement.webkitRequestFullScreen) {
                    document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
                }
            } else {

                 _fullscreenBtn.className="menuBtn";
                if (document.cancelFullScreen) {
                    document.cancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                }
            }
        }

        prevState(): void {

            _currentIndex--;
            if(_currentIndex<0) _currentIndex=0;
            goState(presentationData.slides[_currentIndex].state, fadeType.RANDOM, _game);
           
            
        }

        nextState(): void {

            
            _currentIndex++;
            if(_currentIndex>=presentationData.slides.length) _currentIndex=presentationData.slides.length-1;
            goState(presentationData.slides[_currentIndex].state, fadeType.RANDOM, _game);
            
            
        }



    }

    
    window.onload = () => new initPresentation(1024, 768);
    window.onresize = () => setResize();    
}