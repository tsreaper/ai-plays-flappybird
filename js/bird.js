///<reference path="network.ts"/>
///<reference path="ReLuActivationNetwork.ts"/>
///<reference path="ArcTanActivationNetwork.ts"/>
var Bird = /** @class */ (function () {
    function Bird() {
        this.network = new ArcTanActivationNetwork();
        this.init();
    }
    Bird.prototype.init = function () {
        this._fitness = 0;
        this.score = 0;
        this.x = Data.game.BIRD_INIT_X;
        this.y = Data.game.BIRD_INIT_Y;
        this.speed = 0;
        this.alive = true;
    };
    /**Use neural network to decide whether to fly or not*/
    Bird.prototype.fly = function (PipeDistance, pipeUpper) {
        if (this.alive) {
            this._fitness++;
            if (this.network.getOutput(PipeDistance / Data.animation.SCREEN_WIDTH, (this.y - pipeUpper) / Data.animation.SCREEN_HEIGHT)) {
                this.speed = -Data.game.FLY_SPEED;
            }
        }
        this.speed += Data.game.GRAVITY;
        this.y += this.speed;
    };
    Object.defineProperty(Bird.prototype, "fitness", {
        get: function () {
            return this._fitness;
        },
        enumerable: true,
        configurable: true
    });
    return Bird;
}());
