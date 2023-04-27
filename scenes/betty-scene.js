import {SlideScene} from "./slide-scene.js"
export class BettyScene extends SlideScene {

    constructor() {
        super('betty');
    }
    preload() {
        this.load.path = './assets/';
        this.load.image('betty_portrait', 'betty_portrait.png');
        this.load.image('betty_logo', 'betty_logotype.png');

    }
    startNext(){
        this.scene.start('association')
    }
    create() {
        super.create()
        const winX = this.game.config.width;
        const winY = this.game.config.height;
        //set the logo in the center 
        this.betty = this.add.image(winX / 2, winY * .3, 'betty_portrait').setScale(0.3);
        this.betty_logo = this.add.image(winX / 2, winY * .6, 'betty_logo').setScale(0.2);
        this.betty.setAlpha(0);
        this.betty_logo.setAlpha(0);
        
        // const subtitle_str = "Betty\nProductions"
        // this.subs = this.add.text(winX / 2, winY * .6, subtitle_str,
        //     {
        //         fontFamily: 'Instrument Serif',
        //         fontSize: 24, 
        //         color: '#ffffff', 
        //         align: 'center', 
        //         wordWrap: { 
        //             width: winX * .8, 
        //         //    useAdvancedWrap: true 
        //         },
                
        //     }).setOrigin(0.5, 0.5).setAlpha(0);
            const chain = this.tweens.chain({
                targets: [this.betty, this.betty_logo],
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

