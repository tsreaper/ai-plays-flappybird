///<reference path="imageManager.ts"/>
///<reference path="game.ts"/>
///<reference path="dashboard.ts"/>
///<reference path="animation.ts"/>
let game;
let dashboard;
let animation;

let bgString = (new Date().getHours() + 6) % 24 < 12 ? "bgNight" : "bgDay";

ImageManager.loadImage([bgString,"land","pipeUp","pipeDown","pipeRedUp","pipeRedDown","birdRed0","birdBlue0","birdYellow0","0","1","2","3","4","5","6","7","8","9"]);
ImageManager.loadComplete = function ()
{
    game = new Game();
    dashboard = new Dashboard();
    animation = new Animation();
    game.initGame();
};
