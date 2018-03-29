function Bird() {
    this.network = new Network();
    this.seeTwoPipe = dashboard.seeTwoPipe; // Foresee the next coming two pipes instead of one
    this.init();
}

Bird.prototype = {
    init: function() {
        this.fitness = 0; // The distance the bird has flown
        this.score = 0; // The number of pipes the bird has passed
        this.x = Data.game.BIRD_INIT_X;
        this.y = Data.game.BIRD_INIT_Y;
        this.speed = 0;
        this.alive = true;
    },

    // Use neural network to decide whether to fly or not
    fly: function(pipeDis, pipeUpper, pipe2Upper) {
        if (this.alive) {
            this.fitness++;
            if (this.network.getOutput(
                pipeDis / Data.animation.SCREEN_WIDTH, (this.y - pipeUpper) / Data.animation.SCREEN_HEIGHT,
                this.seeTwoPipe ? (this.y - pipe2Upper) / Data.animation.SCREEN_HEIGHT : 0
            )) {
                this.speed = -Data.game.FLY_SPEED;
            }
        }
        this.speed += Data.game.GRAVITY;
        this.y += this.speed;
    }
}
