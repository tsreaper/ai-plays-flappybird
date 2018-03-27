class Data {
    /**The id of each input node and output node*/
    static network: {
        NODE_BIAS: number;
        NODE_PIPE_DIS: number;
        NODE_PIPE_UPPER: number;
        NODE_OUTPUT: number;
        INPUT_SIZE: number;
        /**The largest increment(decrement) when changing the weight of an edge*/
        STEP_SIZE: number;
        ADD_NODE_CHANCE: number
    };
    static generation: {
        BIRD_NUM: number;
        SURVIVOR_NUM: number;
        MUTATE_CHANCE: number
    };
    static animation: {
        SCREEN_WIDTH: number;
        SCREEN_HEIGHT: number;
        LAND_NUM: number;
        SCORE_Y: number;
        SCORE_WIDTH: number;
        SCORE_SPACE: number
    };
    static game: {
        PIPE_NUM: number;
        PIPE_WIDTH: number;
        PIPE_HEIGHT: number;
        PIPE_MIN_Y: number;
        PIPE_MAX_Y: number;
        SPACE_HEIGHT: number;
        BIRD_INIT_X: number;
        BIRD_INIT_Y: number;
        BIRD_RADIUS: number;
        GRAVITY: number;
        /**The y-coordinate speed after the bird flap its wings*/
        FLY_SPEED: number;
        /**The x-coordinate speed of the birds*/
        MOVE_SPEED: number;
        LAND_Y: number
    };
}

Data.network =
    {
        NODE_BIAS: 1,
        NODE_PIPE_DIS: 2,
        NODE_PIPE_UPPER: 3,
        NODE_OUTPUT: 20,

        INPUT_SIZE: 3,

        STEP_SIZE: 0.1,
        ADD_NODE_CHANCE: 0.5
    };

Data.generation =
    {
        BIRD_NUM: 15,
        SURVIVOR_NUM: 5,
        MUTATE_CHANCE: 0.5
    };

Data.animation =
    {
        SCREEN_WIDTH: 336,
        SCREEN_HEIGHT: 512,

        LAND_NUM: 2,

        SCORE_Y: 20,
        SCORE_WIDTH: 24,
        SCORE_SPACE: 2
    };

Data.game =
    {
        PIPE_NUM: 2,
        PIPE_WIDTH: 52,
        PIPE_HEIGHT: 500,
        PIPE_MIN_Y: 100,
        PIPE_MAX_Y: 305,
        SPACE_HEIGHT: 85,

        BIRD_INIT_X: 100,
        BIRD_INIT_Y: 200,
        BIRD_RADIUS: 12,
        GRAVITY: 0.25,
        FLY_SPEED: 5.25,
        MOVE_SPEED: 2.25,

        LAND_Y: 495
    };
