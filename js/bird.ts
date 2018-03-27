///<reference path="network.ts"/>
class Bird {
    public network: Network;
    /** The distance the bird has flown*/
    private _fitness: number;
    /**The number of pipes the bird has passed*/
    score: number;
    x: number;
    y: number;
    speed: number;
    alive: boolean;

    constructor() {
        this.network = new Network();
        this.init();
    }

    public init(): void {
        this._fitness = 0;
        this.score = 0;
        this.x = Data.game.BIRD_INIT_X;
        this.y = Data.game.BIRD_INIT_Y;
        this.speed = 0;
        this.alive = true;
    }

    /**Use neural network to decide whether to fly or not*/
    public fly(pipeDis: number, pipeUpper: number): void {
        if (this.alive) {
            this._fitness++;
            if (this.network.getOutput(pipeDis / Data.animation.SCREEN_WIDTH, (this.y - pipeUpper) / Data.animation.SCREEN_HEIGHT)) {
                this.speed = -Data.game.FLY_SPEED;
            }
        }
        this.speed += Data.game.GRAVITY;
        this.y += this.speed;
    }


    get fitness(): number {
        return this._fitness;
    }
}
