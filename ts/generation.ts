///<reference path="bird.ts"/>
///<reference path="data.ts"/>
class Generation {
    get birds(): Bird[] {
        return this._birds;
    }
    private generationNum: number;
    private _birds: Bird[];

    constructor() {
        this.generationNum = 1;
        this._birds = [];
        for (let i = 0; i < Data.generation.BIRD_NUM; i++) {
            this._birds[i] = new Bird();
            this._birds[i].network.mutate();    // Make the birds different from each other
        }
    }

    private _breed(birdA: number, birdB: number): Bird {
        let baby = new Bird();
        let parentA: number;
        let parentB: number;

        if (this._birds[birdA].fitness < this._birds[birdB].fitness) {
            parentA = birdB;
            parentB = birdA;
        } else {
            parentA = birdA;
            parentB = birdB;
        }

        baby.network.nodeSize = this._birds[parentA].network.nodeSize;
        for (let nodeIdx = 1; nodeIdx <= baby.network.nodeSize; nodeIdx++) {
            baby.network.edges[nodeIdx] = [];
            for (let edgeIdx in this._birds[parentA].network.edges[nodeIdx]) {
                // Check if the parent with less fitness has the same edge
                if (this._birds[parentB].network.edges.hasOwnProperty(`${nodeIdx}`) && this._birds[parentB].network.edges[nodeIdx].hasOwnProperty(edgeIdx)) {
                    baby.network.edges[nodeIdx][edgeIdx] = Math.random() < 0.5 ? this._birds[parentA].network.edges[nodeIdx][edgeIdx] : this._birds[parentB].network.edges[nodeIdx][edgeIdx];
                }
                else {
                    baby.network.edges[nodeIdx][edgeIdx] = this._birds[parentA].network.edges[nodeIdx][edgeIdx];
                }
            }
        }

        if (Math.random() <= Data.generation.MUTATE_CHANCE) {
            baby.network.mutate();
        }
        return baby;
    }

    public nextGeneration() {
        this._birds.sort((a, b) => b.fitness - a.fitness);

        Data.generation.SURVIVOR_NUM = dashboard.getSurvivorNum();
        for (var i = Data.generation.SURVIVOR_NUM; i < Data.generation.BIRD_NUM; i++) {
            this._birds[i] = null;
            delete this._birds[i];
        }

        Data.generation.BIRD_NUM = dashboard.getBirdNum();
        Data.generation.MUTATE_CHANCE = dashboard.getMutateChance();
        for (var i = Data.generation.SURVIVOR_NUM - 1; i >= Data.generation.BIRD_NUM; i--) {
            this._birds[i] = null;
            delete this._birds[i];
        }

        for (let birdToBeKilledIdx = Data.generation.SURVIVOR_NUM; birdToBeKilledIdx < Data.generation.BIRD_NUM; birdToBeKilledIdx++) {
            this._birds[birdToBeKilledIdx] = this._breed(Math.floor(Math.random() * Data.generation.SURVIVOR_NUM), Math.floor(Math.random() * Data.generation.SURVIVOR_NUM));
        }

        for (let survivorIdx = 0; survivorIdx < Data.generation.SURVIVOR_NUM; survivorIdx++) {
            this._birds[survivorIdx].init();
        }
        this.generationNum++;
    }
}
