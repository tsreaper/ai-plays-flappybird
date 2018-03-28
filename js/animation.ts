///<reference path="data.ts"/>
class Animation {
    private _canvas: CanvasRenderingContext2D | null;
    private _landX: number[];


    constructor() {
        const elementById = <HTMLCanvasElement>document.getElementById("canvas");
        this._canvas = elementById.getContext("2d");
        this._landX = [];
    }

    public initAnimation() {
        for (let i = 0; i < Data.animation.LAND_NUM; i++) {
            this._landX[i] = Data.animation.SCREEN_WIDTH * i;
        }
    }

    public updateAnimation() {
        this.moveLands();

        if (!dashboard.enableAnimation) {
            return;
        }

        this.drawBackground();
        this.drawPipes();
        this.drawLands();
        this.drawBirds();
        this.drawScore();

    }

    private drawBackground() {
        this._canvas.drawImage(ImageManager.getImage(bgString), 0, 0);
    }

    private drawPipes() {
        for (let pipeIdx = 0; pipeIdx < Data.game.PIPE_NUM; pipeIdx++) {
            if (dashboard.showPipe && pipeIdx == game.nextPipe) {
                this._canvas.drawImage(ImageManager.getImage("pipeRedUp"), game.pipeX[pipeIdx], game.pipeUpper[pipeIdx] + Data.game.SPACE_HEIGHT);
                this._canvas.drawImage(ImageManager.getImage("pipeRedDown"), game.pipeX[pipeIdx], game.pipeUpper[pipeIdx] - Data.game.PIPE_HEIGHT);
            }
            else {
                this._canvas.drawImage(ImageManager.getImage("pipeUp"), game.pipeX[pipeIdx], game.pipeUpper[pipeIdx] + Data.game.SPACE_HEIGHT);
                this._canvas.drawImage(ImageManager.getImage("pipeDown"), game.pipeX[pipeIdx], game.pipeUpper[pipeIdx] - Data.game.PIPE_HEIGHT);
            }
        }
    }

    private drawLands() {
        for (let landIdx = 0; landIdx < Data.animation.LAND_NUM; landIdx++) {
            this._canvas.drawImage(ImageManager.getImage("land"), this._landX[landIdx], Data.game.LAND_Y);
        }
    }

    private drawBirds() {
        for (let birdIdx = Data.generation.BIRD_NUM - 1; birdIdx >= 0; birdIdx--) {
            this._canvas.save();
            this._canvas.translate(game.generation.birds[birdIdx].x, game.generation.birds[birdIdx].y);
            this._canvas.rotate(Math.min(game.generation.birds[birdIdx].speed * 7, 90) * Math.PI / 180);
            this._canvas.drawImage(ImageManager.getImage(birdIdx ? (birdIdx >= Data.generation.SURVIVOR_NUM ? "birdBlue0" : "birdYellow0") : "birdRed0"), -24, -24);
            this._canvas.restore();
        }
    }

    private drawScore() {
        let score = game.currentScore;
        let width = 0;
        let scoreX;
        if (score == 0) {
            this._canvas.drawImage(ImageManager.getImage("0"), (Data.animation.SCREEN_WIDTH - Data.animation.SCORE_WIDTH) / 2, Data.animation.SCORE_Y);
        }
        else {
            while (score > 0) {
                width += Data.animation.SCORE_WIDTH + Data.animation.SCORE_SPACE;
                score = Math.floor(score / 10);
            }
            width -= Data.animation.SCORE_SPACE;
            score = game.currentScore;
            scoreX = (Data.animation.SCREEN_WIDTH + width) / 2 - Data.animation.SCORE_WIDTH;
            while (score > 0) {
                this._canvas.drawImage(ImageManager.getImage(score % 10), scoreX, Data.animation.SCORE_Y);
                scoreX -= Data.animation.SCORE_WIDTH + Data.animation.SCORE_SPACE;
                score = Math.floor(score / 10);
            }
        }
    }

    private moveLands() {
        for (let landIdx = 0; landIdx < Data.animation.LAND_NUM; landIdx++) {
            if (!game.gameover) {
                this._landX[landIdx] -= Data.game.MOVE_SPEED;
                if (this._landX[landIdx] <= -Data.animation.SCREEN_WIDTH) {
                    this._landX[landIdx] += Data.animation.SCREEN_WIDTH * 2;
                }
            }
        }
    }
}
