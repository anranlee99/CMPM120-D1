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
        this.cameras.main.setBackgroundColor({ r, g, b, a: 150 }); // set the background color of the main camera
        if (Math.floor(tt) - Math.floor(this.ttPrev) > 0) {
            this.colorIndex++;
            this.colors.push(this.getRandomColor());
        }
        this.ttPrev = tt;
    }
    preload() {
        this.load.path = './assets/';
        this.load.audio('hoverSE', 'hover_sound.mp3')
    }
    addInteractiveText(x, y, text) {
        let btn = this.add.text(x, y, text,
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
        btn.setShadow(1, 1, 0, 0, true, true)
        //TODO: add sound on hover 
        btn.on('pointerover', () => {
            btn.setFontSize(this.winX * 0.045)
            this.hoverSE.play()
        }).on('pointerout', () => {
            btn.setFontSize(this.winX * 0.04)
            this.hoverSE.play()
        })
    }
    makeRain() {
        this.hoverSE = this.sound.add('hoverSE')
        this.time.addEvent({
            delay: 100, loop: true, callback: () => {
                let obj = this.componentToHex(this.currColor.r) + this.componentToHex(this.currColor.g) + this.componentToHex(this.currColor.b);
                let drop = this.add.circle(this.winX * Math.random(), this.winY * Math.random()).setStrokeStyle(5, this.comp, 0.3).setFillStyle(this.comp, 0)
                this.tweens.add({
                    targets: drop,
                    radius: { from: 0, to: 200 },
                    duration: 6000,
                    onComplete: () => { drop.destroy() }
                });
                this.tweens.add({
                    targets: drop,
                    alpha: { from: 0.3, to: 0 },
                    duration: 5000,
                });
            }
        });
    }
    makeTitle() {
        let titleStr = "IT'S A DOGGY DOG WORLD OUT THERE".split('')
        this.titleArr = []
        this.titleWidth = 0

        titleStr.forEach((char) => {
            //get a random color
            let c = '#'
            Object.values(this.getRandomColor()).forEach(e => {
                c += this.componentToHex(e)
            })
            //add this to text obj containing just one letter into a container
            //of all the letters of the title
            this.titleArr.push(
                this.add.text(this.winX / 2, this.winY * 0.3, char,
                    {
                        fontFamily: 'Instrument Serif',
                        fontSize: this.winX * 0.05,
                        color: c,
                    }).setStroke(0, 5).setShadow(1, 1, 0, 0, true)
            )

            //increment the length 
            let charlen = this.titleArr[this.titleArr.length - 1].displayWidth  //.width is the same thing
            this.titleWidth += charlen
        })
        //credits -  https://en.wikipedia.org/wiki/Muhammad_ibn_Musa_al-Khwarizmi
        let lOffset = (this.winX - this.titleWidth) / 2
        let charPos = 0;
        this.titleArr.forEach((char) => {
            char.setX(lOffset + charPos) // div by 2 does something 
            charPos += char.displayWidth
        })

        //doesn't need to be a chain but i might add more to the chain
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

        this.titleHeight = this.titleArr[0].displayHeight


        this.titleBorderArr = []
        let TLx = this.titleArr[0].x //- this.titleArr[0].displayWidth/2
        let TLy = this.titleArr[0].y 

        let BRx = this.titleArr[0].x + this.titleWidth + this.titleArr[0].displayWidth/2
        let BRy = this.titleArr[this.titleArr.length-1].y + this.titleHeight
        this.titleBorderArr = [
            this.add.line(TLx, TLy, 0,0, 0, this.titleHeight).setStrokeStyle(1, 0, 1).setFillStyle(0, 1).setOrigin(0,0).setAlpha(0),
            this.add.line(TLx, TLy, 0,0, this.titleWidth + this.titleArr[0].displayWidth/2 , 0).setStrokeStyle(1, 0, 1).setFillStyle(0, 1).setOrigin(0,0).setAlpha(0),
            this.add.line(BRx, BRy, 0,0, 0, -this.titleHeight).setStrokeStyle(1, 0, 1).setFillStyle(0, 1).setOrigin(0,0).setAlpha(0),
        this.add.line(BRx, BRy, 0,0, -this.titleWidth - this.titleArr[0].displayWidth/2, 0).setStrokeStyle(1, 0, 1).setFillStyle(0, 1).setOrigin(0,0).setAlpha(0)
        ]

        const timeline = this.add.timeline([
            {
                at: 1000,
                tween: {
                    targets: this.titleBorderArr[0],
                    x:{from:0, to: this.titleBorderArr[0].x},
                    alpha: 1,
                    duration: 1000,
                    ease: 'Bounce.easeOut'
                }
            },
            {
                at: 2000,
                tween: {
                    targets: this.titleBorderArr[1],
                    y:{from:0, to: this.titleBorderArr[1].y},
                    alpha: 1,
                    duration: 1000,
                    ease: 'Bounce.easeOut'
                }
            },
            {
                at: 3000,
                tween: {
                    targets: this.titleBorderArr[2],
                    x:{from:this.winX, to: this.titleBorderArr[2].x},
                    alpha: 1,
                    duration: 1000,
                    ease: 'Bounce.easeOut'
                }
            },
            {
                at: 4000,
                tween: {
                    targets: this.titleBorderArr[3],
                    y:{from:this.winY, to: this.titleBorderArr[3].y},
                    alpha: 1,
                    duration: 1000,
                    ease: 'Bounce.easeOut'
                }
            },
            
        ]); 
        timeline.play();
    }
    create() {
        super.create()
        this.winX = this.game.config.width;
        this.winY = this.game.config.height;

        this.graphics = this.add.graphics();

        this.makeTitle()
        this.time.addEvent({
            delay: 1000, loop: true, callback: () => {
                // this.graphics.lineStyle(5, 0, 1)
                // this.tweens.add({
                //     targets: drop,
                //     radius: { from: 0, to: 200 },
                //     duration: 6000,
                //     onComplete: () => { drop.destroy() }
                // });
                // this.tweens.add({
                //     targets: drop,
                //     alpha: { from: 0.3, to: 0 },
                //     duration: 5000,
                // });
            }
        });
        this.addInteractiveText(this.winX / 2, this.winY * 0.6, "PLAY")
        this.addInteractiveText(this.winX / 2, this.winY * 0.7, "SETTINGS")
        this.addInteractiveText(this.winX / 2, this.winY * 0.8, "CREDITS")

        this.makeRain()


    }

    update() {
        this.discriminateDog();

    }

}

