# AI-Plays-FlappyBird
Using genetic algorithm and neural networks to teach AI to play flappy bird. Inspired by [this project](https://github.com/pakoito/MarI-O) and [this paper](http://nn.cs.utexas.edu/downloads/papers/stanley.ec02.pdf). The dashboard in the html page is inspired by [this website](http://rednuht.org/genetic_walkers/).

You can try this project in [this page](https://tsreaper.github.io/AI-Plays-FlappyBird/).

The TypeScript version is committed mainly by [@javatlacati](https://github.com/javatlacati). [Check it out](https://github.com/TsReaper/AI-Plays-FlappyBird/tree/typescript).

## Goals
- [x] Make a flappy bird game
- [x] Construct neural networks
- [x] Construct genetic algorithms
- [x] Teach the networks to play flappy bird
- [x] Make the animation more fancy :)
- [x] Make a little controller in the html page
- [ ] ~~Finish the "compete with AI" function~~ Too complicated and will make my code messy (though it is already a mess now). I give up...

## Results and Notes
<img src="https://github.com/TsReaper/AI-Plays-FlappyBird/blob/master/result.png" align="right">

### 2018/03/29
It seems that there are more cons than pros for the birds to foresee the next two pipes instead of one, so I add an option on the dashboard to let the user enable or disable this feature (disabled by default).

### 2018/03/28
I didn't expect this repo to have so many stars (at least from my perspective) when I first wrote this litte project. I reviewed this project today and made some changes.

* A few more activation functions are added and can be selected from the dashboard (inspired by the TypeScript version committed by [@javatlacati](https://github.com/javatlacati)).

* The height of the next-next-coming pipe is also fed to the neural network. This will make the evolution a little harder, but it provides a better result when the map is scrolling faster. Check the pros and cons of this feature [in this discussion](https://github.com/TsReaper/AI-Plays-FlappyBird/pull/2#issuecomment-377093794).

### 2016/06/20
Rewrite the whole project in a syntax which is easier(?) to read and add the "enable animation" function.

### 2016/06/19
This problem is indeed too easy for neural networks to solve. We just need to use this strategy: If the y-coordinate of the bird is larger than the next pipe, then fly. Otherwise just do nothing. This strategy can make the bird fly almost forever (I once reduce MOVE_SPEED to 2 and the bird is still flying after passing 10,000 pipes).

Anyhow, this is my first neural network program. Although the problem is very easy, it's still very interesting :) I'll try more games afterwards.

### 2016/06/18
I discovered that there were some bugs in my previous code. After solving them the birds seems to evolve well :) They can now fly through hundreds of pipes within 100 generations.

Actually, their neural network is not very complicated, even for the best individual. There are only about 1 or 2 nodes in the hidden layer of the network, so I think this problem might be too easy for a neural network to solve. I'll try some more interesting games later.

### 2016/06/17
I've created the basic parts of this project and it can be tested now. But my birds are not evolving well :( Generation after generation, they just can't fly through the pipe. Maybe the "NEAT" method doesn't work very well on this problem. I'll consider this problem later.
