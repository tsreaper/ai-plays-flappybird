///<reference path="data.ts"/>
var Dashboard = /** @class */ (function () {
    function Dashboard() {
        this._enableAnimation = document.getElementById("enable-animation");
        this._showPipe = document.getElementById("show-pipe");
        this._popSize = document.getElementById("pop-size");
        this._surviveRate = document.getElementById("survive-rate");
        this._mutateChance = document.getElementById("mutate-chance");
        this._simSpeed = document.getElementById("sim-speed");
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
    Dashboard.prototype.initDashboard = function () {
        document.getElementById("generation-num").innerHTML = game.generation.generationNum;
        game.setTimer();
    };
    Dashboard.prototype.updateDashboard = function () {
        var table = document.getElementById("score");
        var tr;
        var td;
        table.innerHTML = "";
        for (var birdIdx = 0; birdIdx < Data.generation.BIRD_NUM; birdIdx++) {
            tr = document.createElement("tr");
            td = document.createElement("td");
            td.appendChild(document.createTextNode("" + (birdIdx + 1)));
            tr.appendChild(td);
            td = document.createElement("td");
            td.appendChild(document.createTextNode(game.generation.birds[birdIdx].fitness));
            tr.appendChild(td);
            td = document.createElement("td");
            td.appendChild(document.createTextNode(game.generation.birds[birdIdx].score));
            tr.appendChild(td);
            table.appendChild(tr);
        }
    };
    Dashboard.prototype.addHistory = function () {
        var table = document.getElementById("history");
        var tr;
        var td;
        var generation = game.generation;
        var birdsOfGeneration = generation.birds;
        birdsOfGeneration.sort(function (a, b) {
            return b.fitness - a.fitness;
        });
        tr = document.createElement("tr");
        td = document.createElement("td");
        td.appendChild(document.createTextNode(generation.generationNum));
        tr.appendChild(td);
        td = document.createElement("td");
        var bestBird = birdsOfGeneration[0];
        td.appendChild(document.createTextNode(bestBird.fitness));
        tr.appendChild(td);
        // td = document.createElement("td");
        // td.appendChild(document.createTextNode(`${game.generation.birds[0].network.nodes.map(num=>String.fromCharCode(num+64)).join('')}`));
        // tr.appendChild(td);
        td = document.createElement("td");
        td.appendChild(document.createTextNode(bestBird.score));
        tr.appendChild(td);
        table.appendChild(tr);
    };
    Dashboard.prototype.getSurvivorNum = function () {
        var surviveRate = this._surviveRate;
        return Math.ceil(Number(surviveRate.options[surviveRate.selectedIndex].value) * Data.generation.BIRD_NUM);
    };
    Dashboard.prototype.getBirdNum = function () {
        var populationSize = this._popSize;
        return Number(populationSize.options[populationSize.selectedIndex].value);
    };
    Dashboard.prototype.getMutateChance = function () {
        var mutateChance = this._mutateChance;
        return Number(mutateChance.options[mutateChance.selectedIndex].value);
    };
    Dashboard.prototype.getSimSpeed = function () {
        var simulationSpeed = this._simSpeed;
        return simulationSpeed.options[simulationSpeed.selectedIndex].value;
    };
    return Dashboard;
}());
