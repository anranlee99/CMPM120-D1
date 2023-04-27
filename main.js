// Aaron Lee
// Created: 4/25/23
// CMPM 120 - D1 Cinematic
import { BettyScene } from "./scenes/betty-scene.js";
import { AssocScene } from "./scenes/assoc-scene.js";
import { SammyScene } from "./scenes/sammy-scene.js";
import { RikiScene } from "./scenes/riki-scene.js";
import { CopyrightScene } from "./scenes/copyright-scene.js";
import { MainMenuScene } from "./scenes/mainMenu-scene.js";

let config = {
    type: Phaser.WEBGL,
    debug: true,
    width: window.innerWidth * .9,
    height: window.innerHeight * .9,
    backgroundColor: 0,
    scene: [  BettyScene, AssocScene, SammyScene, CopyrightScene, RikiScene, MainMenuScene]
}

let game = new Phaser.Game(config);




//so this will be under the canvas, since it'll run after the game is created
let info = document.createElement('p')
info.innerHTML = "Click to skip forward.\nP - Skip to main menu.\nR - Restart."
document.body.appendChild(info)
