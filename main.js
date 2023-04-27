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
    width: window.innerWidth * .8,
    height: window.innerHeight * .8,
    backgroundColor: 0,
    scene: [  BettyScene, AssocScene, SammyScene, CopyrightScene, RikiScene, MainMenuScene]
}

let game = new Phaser.Game(config);





// GET AI TO DO HTML/CSS 
// because i have no respect for frontend devs /s


// create the footer element
const footer = document.createElement('footer');
footer.style.position = 'fixed';
footer.style.bottom = '0';
footer.style.width = '100%';

// create the first div element
const div1 = document.createElement('div');
div1.style.display = 'flex';
div1.style.flexDirection = 'column';
div1.style.alignItems = 'center';
div1.style.justifyContent = 'center';

// create the first inner div element
const div2 = document.createElement('div');
div2.style.display = 'flex';
div2.style.alignItems = 'center';

// create and add the three first paragraphs
const p1 = document.createElement('p');
p1.innerText = 'Click to skip forward.';
p1.style.marginRight = '10px';

const p2 = document.createElement('p');
p2.innerText = 'P - Skip to main menu.';
p2.style.marginRight = '10px';

const p3 = document.createElement('p');
p3.innerText = 'R - Restart.';
p3.style.marginRight = '10px';

div2.appendChild(p1);
div2.appendChild(p2);
div2.appendChild(p3);

// add the first inner div element to the first div element
div1.appendChild(div2);

// create the second inner div element
const div3 = document.createElement('div');
div3.style.display = 'flex';
div3.style.alignItems = 'center';

// create the anchor element
const a = document.createElement('a');
a.href = 'https://github.com/anranlee99/CMPM120-D1';
a.style.display = 'flex';
a.style.alignItems = 'center';
a.style.marginRight = '5px';

// create the image element and set its attributes
const img = document.createElement('img');
img.src = './assets/github-mark.svg';
img.alt = 'GitHub logo';
img.style.height = '16px';

// add the image element to the anchor element
a.appendChild(img);

// create and add the last paragraph
const p4 = document.createElement('p');
p4.innerText = '© 2023 Aaron Lee. All rights reserved.';
p4.style.marginRight = '10px';

// add the second inner div element to the first div element
div3.appendChild(a);
div3.appendChild(p4);

// add the first and second div elements to the footer element
div1.appendChild(div3);
footer.appendChild(div1);

// add the footer element to the body element of the HTML document
document.body.appendChild(footer);
