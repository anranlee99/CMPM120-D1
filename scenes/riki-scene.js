import {SlideScene} from "./slide-scene.js"
export class RikiScene extends SlideScene {

    constructor() {
        super('riki');
    }
    preload() {
        this.load.path = './assets/';
        this.load.image('riki_portrait', 'riki_portrait.png');

    }
    startNext(){
        this.scene.start('main_menu')
    }
    create() {
        super.create()
        const winX = this.game.config.width;
        const winY = this.game.config.height;
        //set the logo in the center 
        this.riki = this.add.image(winX / 2, winY * .3, 'riki_portrait').setScale(0.3);
        this.riki.setAlpha(0);
        
        const subtitle_str = "Riki Studio\nPresents"
        this.subs = this.add.text(winX / 2, winY * .6, subtitle_str,
            {
                fontFamily: 'Instrument Serif',
                fontSize: 24, 
                color: '#ffffff', 
                align: 'center', 
                wordWrap: { 
                    width: winX * .8, 
                //    useAdvancedWrap: true 
                },
                
            }).setOrigin(0.5, 0.5).setAlpha(0);
            const chain = this.tweens.chain({
                targets: [this.riki, this.subs],
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

