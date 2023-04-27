import {SlideScene} from "./slide-scene.js"
export class SammyScene extends SlideScene {

    constructor() {
        super('sammy');
    }
    preload() {
        this.load.path = './assets/';
        this.load.image('sammy_portrait', 'sammy_portrait.png');
       this.load.image('adam_smith', 'adam_smith.jpeg');

    }
    startNext(){
        this.scene.start('copyright')
    }
    create() {
        super.create()
        const winX = this.game.config.width;
        const winY = this.game.config.height;
        //set the logo in the center 
        this.sammy = this.add.image(winX / 3, winY * .4, 'sammy_portrait').setScale(0.5);
        this.adam = this.add.image(winX *2/ 3, winY * .4, 'adam_smith').setScale(0.5);
        this.sammy.setAlpha(0);
        
        const subtitle_str = "Sammy The Slug"
        const sub2 = "Adam Smith"
        this.subs = [];
        this.subs.push(this.add.text(winX /3, winY * .75, subtitle_str,
            {
                fontFamily: 'Instrument Serif',
                fontSize: 24, 
                color: '#ffffff', 
                align: 'center', 
                wordWrap: { 
                    width: winX * .8, 
                //    useAdvancedWrap: true 
                },
                
            }).setOrigin(0.5, 0.5).setAlpha(0));
        this.subs.push(this.add.text(winX *2/3, winY * .75, sub2,
            {
                fontFamily: 'Instrument Serif',
                fontSize: 24, 
                color: '#ffffff', 
                align: 'center', 
                wordWrap: { 
                    width: winX * .8, 
                //    useAdvancedWrap: true 
                },
                
            }).setOrigin(0.5, 0.5).setAlpha(0));
            const chain = this.tweens.chain({
                targets: [this.sammy, ... this.subs, this.adam],
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

