///<reference path="data.ts"/>
///<reference path="generation.ts"/>
class Game{
    private generation: Generation;
    private nextPipe: number;
    private gameover: boolean;
    private currentScore: number;
    private _aliveNum: number;
    private pipeX: number[];
    private pipeUpper: number[];
    private timer:number;

    constructor() {
        this._aliveNum = 0;

        this.currentScore = 0;
        this.gameover = false;

        this.pipeX = [];
        this.pipeUpper = [];
        this.nextPipe = Data.game.PIPE_NUM;
        this.generation = new Generation();
    }


    private _getNewPipeY ():number {
        return Math.floor(Math.random() * (Data.game.PIPE_MAX_Y - Data.game.PIPE_MIN_Y)) + Data.game.PIPE_MIN_Y;
    }

    public initGame () {
        // Initialize the position of pipes
        for (var i = 0; i < Data.game.PIPE_NUM; i++) {
            this.pipeX[i] = (Data.animation.SCREEN_WIDTH + Data.game.PIPE_WIDTH) * (1.5 + i * 0.5);
            this.pipeUpper[i] = this._getNewPipeY();
        }
        this.pipeX[Data.game.PIPE_NUM] = Number.MAX_VALUE;

        this._aliveNum = Data.generation.BIRD_NUM;
        this.currentScore = 0;
        this.gameover = false;

        dashboard.initDashboard();
        animation.initAnimation();
    }

    public updateGame () {
        if (!this.gameover) {
            // Move pipes
            for (var i = 0; i < Data.game.PIPE_NUM; i++) {
                this.pipeX[i] -= Data.game.MOVE_SPEED;
                if (this.pipeX[i] <= -Data.game.PIPE_WIDTH) {
                    this.pipeX[i] = Data.animation.SCREEN_WIDTH;
                    this.pipeUpper[i] = this._getNewPipeY();
                }
            }
            if (this.pipeX[this.nextPipe] < Data.game.BIRD_INIT_X - Data.game.PIPE_WIDTH - Data.game.BIRD_RADIUS) {
                this.currentScore++;
            }

            // Find next pipe
            this.nextPipe = Data.game.PIPE_NUM;
            for (var i = 0; i < Data.game.PIPE_NUM; i++) {
                if (this.pipeX[i] >= Data.game.BIRD_INIT_X - Data.game.PIPE_WIDTH - Data.game.BIRD_RADIUS && this.pipeX[i] < this.pipeX[this.nextPipe]) {
                    this.nextPipe = i;
                }
            }
        }

        // Move birds
        for (var i = 0; i < Data.generation.BIRD_NUM; i++) {
            this.generation.birds[i].fly(this.pipeX[this.nextPipe] - Data.game.BIRD_INIT_X, this.pipeUpper[this.nextPipe]);
            if (this.generation.birds[i].alive) {
                this.generation.birds[i].score = this.currentScore;
                // Bird hit the land
                if (this.generation.birds[i].y + Data.game.BIRD_RADIUS >= Data.game.LAND_Y) {
                    this.generation.birds[i].alive = false;
                }
                // Bird fly too high
                else if (this.generation.birds[i].y <= -Data.game.BIRD_RADIUS) {
                    this.generation.birds[i].alive = false;
                }
                // Bird hit the pipe
                else if (this.pipeX[this.nextPipe] - Data.game.BIRD_INIT_X <= Data.game.BIRD_RADIUS) {
                    if (this.generation.birds[i].y - Data.game.BIRD_RADIUS <= this.pipeUpper[this.nextPipe] || this.generation.birds[i].y + Data.game.BIRD_RADIUS >= this.pipeUpper[this.nextPipe] + Data.game.SPACE_HEIGHT) {
                        this.generation.birds[i].alive = false;
                    }
                }
                if (!this.generation.birds[i].alive) {
                    this._aliveNum--;
                }
            }
            else if (!this.gameover) {
                this.generation.birds[i].x -= Data.game.MOVE_SPEED;
            }
            // Prevent the bird from falling below the lower edge of the canvas
            if (this.generation.birds[i].y + Data.game.BIRD_RADIUS >= Data.game.LAND_Y) {
                this.generation.birds[i].y = Data.game.LAND_Y - Data.game.BIRD_RADIUS;
            }
        }

        this.checkForGameOver();

        dashboard.updateDashboard();
        animation.updateAnimation();
    }

    private checkForGameOver() {
        if (!this._aliveNum && !this.gameover) {
            var self = this;
            dashboard.addHistory();
            setTimeout(function () {
                clearInterval(this.timer);
                self.generation.nextGeneration();
                self.initGame();
            }, dashboard.getSimSpeed() * 70);
            this.gameover = true;
        }
    }

    public setTimer () {
        var self = this;
        if (this.timer) {
            clearInterval(this.timer);
        }
        this.timer = setInterval(function () {
            self.updateGame();
        }, dashboard.getSimSpeed());
    }
}
