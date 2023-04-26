import {SlideScene} from "./slide-scene.js"
export class SammyScene extends SlideScene {

    constructor() {
        super('sammy');
    }
    preload() {
        this.load.path = './assets/';
        this.load.image('sammy_portrait', 'sammy_portrait.png');

    }
    startNext(){
        this.scene.start('copyright')
    }
    create() {
        super.create()
        const winX = this.game.config.width;
        const winY = this.game.config.height;
        //set the logo in the center 
        this.sammy = this.add.image(winX / 2, winY * .3, 'sammy_portrait').setScale(0.5);
        this.sammy.setAlpha(0);
        
        const subtitle_str = "Sammy The Slug"
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
                targets: [this.sammy, this.subs],
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
            const activeScenes = {
                sammy: true,
                riki: false
            }
    }
    update() { 
    }
}

