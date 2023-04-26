import { SlideScene } from "./slide-scene.js"
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
    startNext() {

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
        this.comp = '#' + this.rgbToHex(255 - r, 255 - g, 255 - b);
    }

    discriminateDog() {
        let elapsed = this.time.now - this.time.startTime;
        let tt = elapsed / this.maxTime;
        let t = tt % 1; // calculate a value between 0 and 1 that represents the progress of the color transition
        let color1 = this.colors[this.colorIndex]; // current color
        let color2 = this.colors[(this.colorIndex + 1) % this.colors.length]; // next color
        let r = Math.round(this.lerp(color1.r, color2.r, t)); // interpolate between the red components of the two colors
        let g = Math.round(this.lerp(color1.g, color2.g, t)); // interpolate between the green components of the two colors
        let b = Math.round(this.lerp(color1.b, color2.b, t)); // interpolate between the blue components of the two colors
        this.complement(r, g, b);
        this.currColor = { r, g, b }
        this.cameras.main.setBackgroundColor({ r, g, b, a:150}); // set the background color of the main camera
        if (Math.floor(tt) - Math.floor(this.ttPrev) > 0) {
            this.colorIndex++;
            this.colors.push(this.getRandomColor());
        }
        this.ttPrev = tt;
    }
    preload() {
        this.load.path = './assets/';
    }
    create() {
        super.create()
        this.winX = this.game.config.width;
        this.winY = this.game.config.height;
        // this.title = this.add.text(this.winX / 2, this.winY * 0.3, "IT'S A DOGGY DOG WORLD OUT THERE",
        //     {
        //         fontFamily: 'Instrument Serif',
        //         fontSize: 48,
        //         color: '#000000',
        //         // align: 'center',


        //     }).setStroke('#000000', 1).setOrigin(0.5, 0.5);
        // this.title.setShadow(3, 1, '#bbbbbb', 2, true, true);
        let titleStr = "IT'S A DOGGY DOG WORLD OUT THERE".split('')
        this.titleArr = []
        let titleWidth = 0
        titleStr.forEach((char) => {
            //get a random color
            let c = '#'
            Object.values(this.getRandomColor()).forEach(e => {
                c += this.componentToHex(e)
            })
            console.log(this.winX * 0.01)
            //add this to text obj containing just one letter into a container
            //of all the letters of the title
            this.titleArr.push(
                this.add.text(this.winX / 2, this.winY * 0.3, char,
                    {
                        fontFamily: 'Instrument Serif',
                        fontSize: this.winX * 0.05,
                        // fontSize: 40,
                        color: c,
                    })
            )

            //increment the length 
            let charlen = this.titleArr[this.titleArr.length - 1].displayWidth  //.width is the same thing
            titleWidth += charlen
        })
        let lOffset = (this.winX - titleWidth) /2
        let charPos = 0;
        //this.add.line((this.winX-titleWidth)/2, this.winY*0.3, 0, 0, titleWidth, 0, 0, 1)
        this.titleArr.forEach((char) => {
            //left offset should be 
            
            // char.setStroke('#000000', 1).setOrigin(0.5, 0.5).setShadow(3, 0, '#111111', 2, true, true)
            char.setX(lOffset + charPos) // div by 2 does something 
            charPos += char.displayWidth
            char.setText(char.text + " ")

        })


        this.tweens.chain({
            targets: [...this.titleArr],
            tweens: [
                {
                    y: { from: 0, to: this.winY * 0.3 },
                    duration: 1000,
                    ease: 'Bounce.easeOut'
                },
            ]

        })
        this.playBtn = this.add.text(this.winX / 2, this.winY / 2, "PLAY",
            {
                fontFamily: 'Instrument Serif',
                fontSize: this.winX * 0.04,
                color: '#000000',
                align: 'center',
                wordWrap: {
                    width: this.winX * .8,
                    //    useAdvancedWrap: true 
                },

            }).setOrigin(0.5, 0.5).setInteractive();

        this.playBtn.on('pointerover', () => {
            this.playBtn.setFontSize(this.winX * 0.045)
        }).on('pointerout', () => {
            this.playBtn.setFontSize(this.winX * 0.04)
        })
        this.graphics = this.add.graphics();

        
        this.time.addEvent({
            delay: 100, loop: true, callback: () => {
                let obj = this.componentToHex(this.currColor.r) + this.componentToHex(this.currColor.g) + this.componentToHex(this.currColor.b);
                let drop = this.add.circle(this.winX * 0.9 * Math.random() + this.winX * 0.1, this.winY * 0.9 * Math.random() + this.winY * 0.1).setStrokeStyle(5, this.comp, 0.3).setFillStyle(this.comp, 0)
                this.tweens.add({
                    targets: drop,
                    radius: { from: 0, to: 200 },
                    // alpha: {from: 0.3, to: 0},
                    duration: 6000,
                    onComplete: () => { drop.destroy() }
                });
                this.tweens.add({
                    targets: drop,
                    // radius: {from: 0, to: 200},
                    alpha: { from: 0.3, to: 0 },
                    duration: 5000,
                });
            }
        });

    }

    update() {
        this.discriminateDog();


    }

}

