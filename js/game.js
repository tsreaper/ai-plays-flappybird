///<reference path="data.ts"/>
///<reference path="generation.ts"/>
var Game = /** @class */ (function () {
    function Game() {
        this._aliveNum = 0;
        this.currentScore = 0;
        this.gameover = false;
        this.pipeX = [];
        this.pipeUpper = [];
        this.nextPipe = Data.game.PIPE_NUM;
        this.generation = new Generation();
    }
    Game.prototype._getNewPipeY = function () {
        return Math.floor(Math.random() * (Data.game.PIPE_MAX_Y - Data.game.PIPE_MIN_Y)) + Data.game.PIPE_MIN_Y;
    };
    Game.prototype.initGame = function () {
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
    };
    Game.prototype.updateGame = function () {
        if (!this.gameover) {
            this.movePipes();
            this.findNextPipe();
        }
        this.moveBirds();
        this.checkForGameOver();
        dashboard.updateDashboard();
        animation.updateAnimation();
    };
    Game.prototype.movePipes = function () {
        for (var pipeIdx = 0; pipeIdx < Data.game.PIPE_NUM; pipeIdx++) {
            this.pipeX[pipeIdx] -= Data.game.MOVE_SPEED;
            if (this.pipeX[pipeIdx] <= -Data.game.PIPE_WIDTH) {
                this.pipeX[pipeIdx] = Data.animation.SCREEN_WIDTH;
                this.pipeUpper[pipeIdx] = this._getNewPipeY();
            }
        }
        if (this.pipeX[this.nextPipe] < Data.game.BIRD_INIT_X - Data.game.PIPE_WIDTH - Data.game.BIRD_RADIUS) {
            this.currentScore++;
        }
    };
    Game.prototype.findNextPipe = function () {
        this.nextPipe = Data.game.PIPE_NUM;
        for (var i = 0; i < Data.game.PIPE_NUM; i++) {
            if (this.pipeX[i] >= Data.game.BIRD_INIT_X - Data.game.PIPE_WIDTH - Data.game.BIRD_RADIUS && this.pipeX[i] < this.pipeX[this.nextPipe]) {
                this.nextPipe = i;
            }
        }
    };
    Game.prototype.moveBirds = function () {
        for (var birdIdx = 0; birdIdx < Data.generation.BIRD_NUM; birdIdx++) {
            this.generation.birds[birdIdx].fly(this.pipeX[this.nextPipe] - Data.game.BIRD_INIT_X, this.pipeUpper[this.nextPipe]);
            if (this.generation.birds[birdIdx].alive) {
                this.moveAliveBird(birdIdx);
            }
            else if (!this.gameover) {
                this.generation.birds[birdIdx].x -= Data.game.MOVE_SPEED;
            }
            // Prevent the bird from falling below the lower edge of the canvas
            if (this.generation.birds[birdIdx].y + Data.game.BIRD_RADIUS >= Data.game.LAND_Y) {
                this.generation.birds[birdIdx].y = Data.game.LAND_Y - Data.game.BIRD_RADIUS;
            }
        }
    };
    Game.prototype.moveAliveBird = function (birdIdx) {
        this.generation.birds[birdIdx].score = this.currentScore;
        // Bird hit the land
        if (this.generation.birds[birdIdx].y + Data.game.BIRD_RADIUS >= Data.game.LAND_Y) {
            this.generation.birds[birdIdx].alive = false;
        }
        else if (this.generation.birds[birdIdx].y <= -Data.game.BIRD_RADIUS) {
            this.generation.birds[birdIdx].alive = false;
        }
        else if (this.pipeX[this.nextPipe] - Data.game.BIRD_INIT_X <= Data.game.BIRD_RADIUS) {
            if (this.generation.birds[birdIdx].y - Data.game.BIRD_RADIUS <= this.pipeUpper[this.nextPipe] || this.generation.birds[birdIdx].y + Data.game.BIRD_RADIUS >= this.pipeUpper[this.nextPipe] + Data.game.SPACE_HEIGHT) {
                this.generation.birds[birdIdx].alive = false;
            }
        }
        if (!this.generation.birds[birdIdx].alive) {
            this._aliveNum--;
        }
    };
    Game.prototype.checkForGameOver = function () {
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
    };
    Game.prototype.setTimer = function () {
        var self = this;
        if (this.timer) {
            clearInterval(this.timer);
        }
        this.timer = setInterval(function () {
            self.updateGame();
        }, dashboard.getSimSpeed());
    };
    return Game;
}());
