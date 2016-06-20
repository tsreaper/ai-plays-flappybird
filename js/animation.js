function Animation()
{
    this._canvas = document.getElementById("canvas").getContext("2d");
    this._landX = [];
}

Animation.prototype = 
{
    initAnimation: function ()
    {
        for (var i=0;i<Data.animation.LAND_NUM;i++)
        {
            this._landX[i] = Data.animation.SCREEN_WIDTH*i;
        }
    },
    
    updateAnimation: function()
    {
        // Move lands
        for (var i=0;i<Data.animation.LAND_NUM;i++)
        {
            if (!game.gameover)
            {
                this._landX[i] -= Data.game.MOVE_SPEED;
                if (this._landX[i] <= -Data.animation.SCREEN_WIDTH)
                {
                    this._landX[i] += Data.animation.SCREEN_WIDTH*2;
                }
            }
        }
        
        if (!dashboard.enableAnimation)
        {
            return;
        }
        
        this._canvas.drawImage(ImageManager.getImage(bgString), 0, 0);
    
        // Draw pipes
        for (var i=0;i<Data.game.PIPE_NUM;i++)
        {
            if (dashboard.showPipe && i == game.nextPipe)
            {
                this._canvas.drawImage(ImageManager.getImage("pipeRedUp"), game.pipeX[i], game.pipeUpper[i]+Data.game.SPACE_HEIGHT);
                this._canvas.drawImage(ImageManager.getImage("pipeRedDown"), game.pipeX[i], game.pipeUpper[i]-Data.game.PIPE_HEIGHT);
            }
            else
            {
                this._canvas.drawImage(ImageManager.getImage("pipeUp"), game.pipeX[i], game.pipeUpper[i]+Data.game.SPACE_HEIGHT);
                this._canvas.drawImage(ImageManager.getImage("pipeDown"), game.pipeX[i], game.pipeUpper[i]-Data.game.PIPE_HEIGHT);
            }
        }
        
        // Draw lands
        for (var i=0;i<Data.animation.LAND_NUM;i++)
        {
            this._canvas.drawImage(ImageManager.getImage("land"), this._landX[i], Data.game.LAND_Y);
        }
        
        // Draw birds
        for (var i=Data.generation.BIRD_NUM-1;i>=0;i--)
        {
            this._canvas.save();
            this._canvas.translate(game.generation.birds[i].x, game.generation.birds[i].y);
            this._canvas.rotate(Math.min(game.generation.birds[i].speed*7, 90)*Math.PI/180);
            this._canvas.drawImage(ImageManager.getImage(i?(i>=Data.generation.SURVIVOR_NUM?"birdBlue0":"birdYellow0"):"birdRed0"),-24,-24);
            this._canvas.restore();
        }
        
        // Draw score
        var x = game.currentScore, w = 0, scoreX;
        if (x == 0)
        {
            this._canvas.drawImage(ImageManager.getImage("0"),(Data.animation.SCREEN_WIDTH-Data.animation.SCORE_WIDTH)/2,Data.animation.SCORE_Y);
        }
        else
        {
            while (x>0)
            {
                w += Data.animation.SCORE_WIDTH+Data.animation.SCORE_SPACE;
                x = Math.floor(x/10);
            }
            w -= Data.animation.SCORE_SPACE;
            x = game.currentScore;
            scoreX = (Data.animation.SCREEN_WIDTH+w)/2-Data.animation.SCORE_WIDTH;
            while (x>0)
            {
                this._canvas.drawImage(ImageManager.getImage(x%10),scoreX,Data.animation.SCORE_Y);
                scoreX -= Data.animation.SCORE_WIDTH+Data.animation.SCORE_SPACE;
                x = Math.floor(x/10);
            }
        }
        
    }
}
