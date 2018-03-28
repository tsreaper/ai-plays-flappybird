function Generation() {
    this.generationNum = 1;
    this.birds = [];
    for (var i = 0; i < Data.generation.BIRD_NUM; i++) {
        this.birds[i] = new Bird();
        this.birds[i].network.mutate(); // Make the birds different from each other
    }
}

Generation.prototype = {
    nextGeneration: function() {
        this.birds.sort(function(a, b) {
            return b.fitness - a.fitness
        });
        Data.generation.SURVIVOR_NUM = dashboard.getSurvivorNum();
        for (var i = Data.generation.SURVIVOR_NUM; i < Data.generation.BIRD_NUM; i++) {
            this.birds[i] = null;
            delete this.birds[i];
        }

        Data.generation.BIRD_NUM = dashboard.getBirdNum();
        Data.generation.MUTATE_CHANCE = dashboard.getMutateChance();
        for (var i = Data.generation.SURVIVOR_NUM - 1; i >= Data.generation.BIRD_NUM; i--) {
            this.birds[i] = null;
            delete this.birds[i];
        }

        Data.generation.SURVIVOR_NUM = Math.min(Data.generation.SURVIVOR_NUM, Data.generation.BIRD_NUM);
        for (var i = Data.generation.SURVIVOR_NUM; i < Data.generation.BIRD_NUM; i++) {
            this.birds[i] = this._breed(Math.floor(Math.random() * Data.generation.SURVIVOR_NUM), Math.floor(Math.random() * Data.generation.SURVIVOR_NUM));
        }
        for (var i = 0; i < Data.generation.SURVIVOR_NUM; i++) {
            this.birds[i].init();
        }
        this.generationNum++;
    },

    _breed: function(birdA, birdB) {
        var baby = new Bird();
        baby.network.setActivation(Activation.get(dashboard.getActivationFunction()));

        if (this.birds[birdA].fitness < this.birds[birdB].fitness) {
            var t = birdA;
            birdA = birdB;
            birdB = t;
        }

        baby.network.nodeSize = this.birds[birdA].network.nodeSize;
        for (var i = 1; i <= baby.network.nodeSize; i++) {
            baby.network.edges[i] = [];
            for (var j in this.birds[birdA].network.edges[i]) {
                // Check if the parent with less fitness has the same edge
                if (this.birds[birdB].network.edges.hasOwnProperty(i) && this.birds[birdB].network.edges[i].hasOwnProperty(j)) {
                    baby.network.edges[i][j] = Math.random() < 0.5 ? this.birds[birdA].network.edges[i][j] : this.birds[birdB].network.edges[i][j];
                } else {
                    baby.network.edges[i][j] = this.birds[birdA].network.edges[i][j];
                }
            }
        }

        if (Math.random() <= Data.generation.MUTATE_CHANCE) {
            baby.network.mutate();
        }
        return baby;
    }
}
