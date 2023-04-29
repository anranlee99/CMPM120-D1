//CREDIT: professor Adam Smith
export class SlideScene extends Phaser.Scene {
    create() {
        this.input.keyboard.on('keydown-R', () => {
            this.scene.start('betty')
        });
        this.input.keyboard.on('keydown-P', () => {
            this.scene.start('main_menu')
        });
        this.input.once('pointerdown', () => {
            this.startNext()
        });
        this.time.delayedCall(10000, ()=>{
            this.startNext()
        })
    }
}