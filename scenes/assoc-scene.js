import {SlideScene} from "./slide-scene.js"
export class AssocScene extends SlideScene {

    constructor() {
        super('association');
    }
    preload() {
        this.load.path = './assets/';
    }
    startNext(){
        this.scene.start('sammy')
    }
    create() {
        super.create()
        const winX = this.game.config.width;
        const winY = this.game.config.height;
        //set the logo in the center 
        
        const subtitle_str = "In Association With"
        this.subs = this.add.text(winX / 2, winY/2, subtitle_str,
            {
                fontFamily: 'Instrument Serif',
                fontSize: this.winX * 0.3, 
                color: '#ffffff', 
                align: 'center', 
                wordWrap: { 
                    width: winX * .8, 
                //    useAdvancedWrap: true 
                },
                
            }).setOrigin(0.5, 0.5).setAlpha(0);
            const chain = this.tweens.chain({
                targets: [this.subs],
                tweens: [
                    {
                        alpha: 1,
                        duration: 4000,
                        repeat: 0,
                    },
                    {
                        alpha: 0,
                        duration: 4000,
                        repeat: 0,
                    }
                    
                ]
            });
    }
}

