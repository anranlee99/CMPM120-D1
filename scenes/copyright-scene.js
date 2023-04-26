import {SlideScene} from "./slide-scene.js"
export class CopyrightScene extends SlideScene {

    constructor() {
        super('copyright');
    }
    preload() {
        this.load.path = './assets/';
    }
    startNext(){
        this.scene.start('riki')
    }
    create() {
        super.create()
        const winX = this.game.config.width;
        const winY = this.game.config.height;
        //set the logo in the center 

        const subtitle_str = `The following copyright notice (the "Notice") pertains to the video game entitled It's a Doggy Dog World Out There (the "Game") and any associated materials, including but not limited to game software, images, audio, and video (the "Materials").

        Copyright © 2023 MaruHoldings LLC. All rights reserved.
        
        The Game and Materials are protected by copyright laws and international copyright treaties, as well as other intellectual property laws and treaties. Unauthorized reproduction or distribution of the Game or Materials, or any portion thereof, may result in severe civil and criminal penalties and will be prosecuted to the maximum extent possible under law.
        
        MaruHoldings LLC is the exclusive owner of all copyrights in and to the Game and Materials, including without limitation, any and all intellectual property rights related thereto.
        
        By accepting the terms of this Notice and using the Game and Materials, you acknowledge and agree that you shall not acquire any ownership rights in or to the Game or Materials, and that your use of the Game and Materials is subject to the terms and conditions of the accompanying End User License Agreement.
        
        All trademarks, service marks, and trade names used in the Game or Materials are the property of their respective owners.
        
        For any questions regarding this Notice, please contact MaruHoldings LLC at [insert contact information here].`
        this.subs = this.add.text(winX / 2, winY / 2, subtitle_str,
            {
                fontFamily: 'Instrument Serif',
                fontSize: 12,
                color: '#ffffff',
                align: 'center',
                wordWrap: {
                    width: winX * .8,
                },

            }).setOrigin(0.5, 0.5).setAlpha(0);
        //this.subs.setScale(0.5);
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
    update() {
    }
}

