

module core{
    export class boot extends Phaser.State{

        preload(){
         var bmd : Phaser.BitmapData = this.game.add.bitmapData(200,50);
			
			bmd.ctx.fillStyle = '#0096ff';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 200, 50);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('loadingBar', bmd);
			
			bmd = this.game.add.bitmapData(200,50);
			bmd.ctx.fillStyle = '#0096ff';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 200, 50);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('startBtn', bmd);

			bmd = this.game.add.bitmapData(1024,20);
			bmd.ctx.fillStyle = '#00ff00';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 1024, 20);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('collider', bmd);

			bmd = this.game.add.bitmapData(100,100);
			bmd.ctx.fillStyle = '#ff0000';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 100, 100);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('enemy', bmd);

			bmd = this.game.add.bitmapData(100,100);
			bmd.ctx.fillStyle = '#0000ff';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 100, 100);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('player', bmd);

			bmd = this.game.add.bitmapData(100,100);
			bmd.ctx.fillStyle = '#000000';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 100, 100);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('fade', bmd);


        }

     create(){
           
		   	
            this.game.stage.backgroundColor = '#ffffff';
		    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		    this.game.stage.smoothed=false;
		    this.game.scale.pageAlignHorizontally = true;
    	    this.game.scale.pageAlignVertically = true;
		    this.game.state.start('preloader');


        }
    }
}