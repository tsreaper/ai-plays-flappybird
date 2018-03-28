///<reference path="data.ts"/>
class Dashboard {
    private _enableAnimation: HTMLInputElement | null;
    private _showPipe: HTMLInputElement | null;
    private _popSize: HTMLSelectElement | null;
    private _surviveRate: HTMLSelectElement | null;
    private _mutateChance: HTMLSelectElement | null;
    private _simSpeed: HTMLSelectElement | null;
    private enableAnimation: boolean;
    private showPipe: boolean;
    private simSpeed: number;

    constructor() {
        this._enableAnimation = <HTMLInputElement>document.getElementById("enable-animation");
        this._showPipe = <HTMLInputElement>document.getElementById("show-pipe");
        this._popSize = <HTMLSelectElement>document.getElementById("pop-size");
        this._surviveRate = <HTMLSelectElement>document.getElementById("survive-rate");
        this._mutateChance = <HTMLSelectElement>document.getElementById("mutate-chance");
        this._simSpeed = <HTMLSelectElement>document.getElementById("sim-speed");

        this._enableAnimation.checked = true;
        this._showPipe.checked = true;
        this._surviveRate.options[4].selected = true;
        this._mutateChance.options[6].selected = true;
        this._simSpeed.options[2].selected = true;

        this.enableAnimation = true;
        this.showPipe = true;
        this.simSpeed = 12;

        var self = this;
        this._enableAnimation.onchange = function () {
            self.enableAnimation = !self.enableAnimation;
        };
        this._showPipe.onchange = function () {
            self.showPipe = !self.showPipe;
        };
        this._simSpeed.onchange = function () {
            game.setTimer();
        };
    }

    public initDashboard() {
        document.getElementById("generation-num").innerHTML = game.generation.generationNum;
        game.setTimer();
    }

    public updateDashboard() {
        let table = document.getElementById("score");
        let tr;
        let td;

        table.innerHTML = "";
        for (let birdIdx = 0; birdIdx < Data.generation.BIRD_NUM; birdIdx++) {
            tr = document.createElement("tr");
            td = document.createElement("td");
            td.appendChild(document.createTextNode(`${birdIdx + 1}`));
            tr.appendChild(td);

            td = document.createElement("td");
            td.appendChild(document.createTextNode(game.generation.birds[birdIdx].fitness));
            tr.appendChild(td);

            td = document.createElement("td");
            td.appendChild(document.createTextNode(game.generation.birds[birdIdx].score));
            tr.appendChild(td);

            table.appendChild(tr);
        }
    }

    public addHistory() {
        let table = document.getElementById("history");
        let tr;
        let td;

        let generation = game.generation;
        let birdsOfGeneration = generation.birds;
        birdsOfGeneration.sort(function (a, b) {
            return b.fitness - a.fitness
        });

        tr = document.createElement("tr");
        td = document.createElement("td");
        td.appendChild(document.createTextNode(generation.generationNum));
        tr.appendChild(td);

        td = document.createElement("td");
        let bestBird = birdsOfGeneration[0];
        td.appendChild(document.createTextNode(bestBird.fitness));
        tr.appendChild(td);

        // td = document.createElement("td");
        // td.appendChild(document.createTextNode(`${game.generation.birds[0].network.nodes.map(num=>String.fromCharCode(num+64)).join('')}`));
        // tr.appendChild(td);

        td = document.createElement("td");
        td.appendChild(document.createTextNode(bestBird.score));
        tr.appendChild(td);

        table.appendChild(tr);
    }

    public getSurvivorNum(): number {
        const surviveRate = this._surviveRate;
        return Math.ceil(Number(surviveRate.options[surviveRate.selectedIndex].value) * Data.generation.BIRD_NUM);
    }

    public getBirdNum(): number {
        const populationSize = this._popSize;
        return Number(populationSize.options[populationSize.selectedIndex].value);
    }

    public getMutateChance(): number {
        const mutateChance = this._mutateChance;
        return Number(mutateChance.options[mutateChance.selectedIndex].value);
    }

    public getSimSpeed() {
        const simulationSpeed = this._simSpeed;
        return simulationSpeed.options[simulationSpeed.selectedIndex].value;
    }
}
