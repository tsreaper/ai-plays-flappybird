var Data = {};

Data.network = 
{
    // The id of each input node and output node
    NODE_BIAS:         1,
    NODE_PIPE_DIS:     2,
    NODE_PIPE_UPPER:   3,
    NODE_OUTPUT:      20,
    
    INPUT_SIZE:        3,
    
    STEP_SIZE:       0.1,    // The largest increment(decrement) when changing the weight of an edge
    ADD_NODE_CHANCE: 0.5
}

Data.generation = 
{
    BIRD_NUM:         15,
    SURVIVOR_NUM:      5,
    MUTATE_CHANCE:   0.5
}

Data.animation = 
{
    SCREEN_WIDTH:    336,
    SCREEN_HEIGHT:   512,
    
    LAND_NUM:          2,
    
    SCORE_Y:          20,
    SCORE_WIDTH:      24,
    SCORE_SPACE:       2
}

Data.game = 
{
    PIPE_NUM:          2,
    PIPE_WIDTH:       52,
    PIPE_HEIGHT:     500,
    PIPE_MIN_Y:      100,
    PIPE_MAX_Y:      305,
    SPACE_HEIGHT:    100,
    
    BIRD_INIT_X:     100,
    BIRD_INIT_Y:     200,
    BIRD_RADIUS:      12,
    GRAVITY:        0.25,
    FLY_SPEED:      5.25,   // The y-coordinate speed after the bird flap its wings
    MOVE_SPEED:     2.25,   // The x-coordinate speed of the birds
    
    LAND_Y:          495
}
