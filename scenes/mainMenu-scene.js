import {SlideScene} from "./slide-scene.js"
export class MainMenuScene extends SlideScene {

    constructor() {
        super('main_menu');
        this.maxTime = 10000;
        this.colors = [
            this.getRandomColor(),
            this.getRandomColor(),
            this.getRandomColor(),
        ];
        //this.comp = this.complement(this.colors[0].r, this.colors[0].g, this.colors[0].b);
        this.colorIndex = 0; // index of the current color in the colors array
        
    }

    getRandomColor() {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        return { r, g, b };
    }
    startNext(){

    }
    lerp(a, b, t) {
        return a * (1 - t) + b * t;
    }
    componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    rgbToHex(r, g, b) {
        return this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    }
    complement(r, g, b,) {
        let n = this.rgbToHex(255 - r, 255 - g, 255 - b);
        this.comp = n;

    }

    discriminateDog() {
        let elapsed = this.time.now - this.time.startTime;
        let t = (elapsed % this.maxTime) / this.maxTime; // calculate a value between 0 and 1 that represents the progress of the color transition
        let color1 = this.colors[this.colorIndex]; // current color
        let color2 = this.colors[(this.colorIndex + 1) % this.colors.length]; // next color
        let r = Math.round(this.lerp(color1.r, color2.r, t)); // interpolate between the red components of the two colors
        let g = Math.round(this.lerp(color1.g, color2.g, t)); // interpolate between the green components of the two colors
        let b = Math.round(this.lerp(color1.b, color2.b, t)); // interpolate between the blue components of the two colors
        this.complement(r, g, b);

        this.cameras.main.setBackgroundColor({r,g,b}); // set the background color of the main camera
        if (t >= 1) {
            this.colorIndex = (this.colorIndex + 1) % this.colors.length;
        }
        if (elapsed > this.maxTime) {
            //console.log('new color');
            this.maxTime += 10000;
            this.colors[Math.random() * 3] = this.getRandomColor();
        }
    }
    preload() {
        this.load.path = './assets/';
    }
    create() {
        super.create()
        this.winX = this.game.config.width;
        this.winY = this.game.config.height;
        this.circle_centers = [
            {
                x: Math.random() * (this.game.config.width * .8) + (this.game.config.width * .2),
                y: Math.random() * (this.game.config.height * .8) + (this.game.config.height * .2)
            },
            {
                x: Math.random() * (this.game.config.width * .8) + (this.game.config.width * .2),
                y: Math.random() * (this.game.config.height * .8) + (this.game.config.height * .2)
            },
            {
                x: Math.random() * (this.game.config.width * .8) + (this.game.config.width * .2),
                y: Math.random() * (this.game.config.height * .8) + (this.game.config.height * .2)
            },
        ];
        this.radii = [Math.random() * 100, Math.random() * 100, Math.random() * 100];

        this.playBtn = this.add.text(this.winX / 2, this.winY / 2, "PLAY",
            {
                fontFamily: 'Instrument Serif',
                fontSize: 48,
                color: '#000000',
                align: 'center',
                wordWrap: {
                    width: this.winX * .8,
                    //    useAdvancedWrap: true 
                },

            }).setOrigin(0.5, 0.5).setInteractive();

        this.playBtn.on('pointerover', () => {
            this.playBtn.setFontSize(60)
        }).on('pointerout', () => {
            this.playBtn.setFontSize(48)
        })
        this.graphics = this.add.graphics();


        this.time.addEvent({delay: 100, loop: true, callback: () => {
                let drop = this.add.circle(this.winX*Math.random(), this.winY*Math.random()).setStrokeStyle(5, 0, 0.2).setFillStyle(this.comp,0)
                this.tweens.add({
                    targets: drop,
                    radius: {from: 0, to: 200},
                    alpha: {from: 0.5, to: 0},
                    duration: 3000,
                    onComplete: () => { drop.destroy()}
                });
            }
        });

    }

    update() {
        this.discriminateDog();
        // console.log(this.comp)
        // console.log(this.color)
        
        
    }

}

