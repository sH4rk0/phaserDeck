

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

			bmd = this.game.add.bitmapData(100,100);
			bmd.ctx.fillStyle = '#000000';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 100, 100);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('fade', bmd);


        }

     create(){
           
		   	
            this.game.stage.backgroundColor = '#ffcc00';
		    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		    this.game.stage.smoothed=false;
		    this.game.scale.pageAlignHorizontally = true;
    	    this.game.scale.pageAlignVertically = true;
		    this.game.state.start('preloader');


        }
    }
}