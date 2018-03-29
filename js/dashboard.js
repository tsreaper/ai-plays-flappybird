function Dashboard() {
    this._enableAnimation = document.getElementById("enable-animation");
    this._showPipe = document.getElementById("show-pipe");
    this._popSize = document.getElementById("pop-size");
    this._surviveRate = document.getElementById("survive-rate");
    this._mutateChance = document.getElementById("mutate-chance");
    this._seeTwoPipe = document.getElementById("see-two-pipe");
    this._activationFunction = document.getElementById("activation-function");
    this._scrollSpeed = document.getElementById("scroll-speed");
    this._simSpeed = document.getElementById("sim-speed");

    this._enableAnimation.checked = true;
    this._showPipe.checked = true;
    this._surviveRate.options[4].selected = true;
    this._mutateChance.options[6].selected = true;
    this._simSpeed.options[2].selected = true;

    this.enableAnimation = true;
    this.showPipe = true;
    this.seeTwoPipe = false;
    this.simSpeed = 12;

    var self = this;
    this._enableAnimation.onchange = function() {
        self.enableAnimation = !self.enableAnimation;
    }
    this._showPipe.onchange = function() {
        self.showPipe = !self.showPipe;
    }
    this._seeTwoPipe.onchange = function() {
        self.seeTwoPipe = !self.seeTwoPipe;
    }
    this._scrollSpeed.onchange = function() {
        Data.game.MOVE_SPEED = Number(self._scrollSpeed.options[self._scrollSpeed.selectedIndex].value);
    }
    this._simSpeed.onchange = function() {
        game.setTimer();
    }
}

Dashboard.prototype = {
    initDashboard: function() {
        document.getElementById("generation-num").innerHTML = game.generation.generationNum;
        game.setTimer();
    },

    updateDashboard: function() {
        var table = document.getElementById("score");
        var tr, td;

        table.innerHTML = "";
        for (var i = 0; i < Data.generation.BIRD_NUM; i++) {
            tr = document.createElement("tr");
            td = document.createElement("td");
            td.appendChild(document.createTextNode(i + 1));
            tr.appendChild(td);

            td = document.createElement("td");
            td.appendChild(document.createTextNode(game.generation.birds[i].fitness));
            tr.appendChild(td);

            td = document.createElement("td");
            td.appendChild(document.createTextNode(game.generation.birds[i].score));
            tr.appendChild(td);

            table.appendChild(tr);
        }
    },

    addHistory: function() {
        var table = document.getElementById("history");
        var tr, td;

        game.generation.birds.sort(function(a, b) {
            return b.fitness - a.fitness
        });

        tr = document.createElement("tr");
        td = document.createElement("td");
        td.appendChild(document.createTextNode(game.generation.generationNum));
        tr.appendChild(td);

        td = document.createElement("td");
        td.appendChild(document.createTextNode(game.generation.birds[0].fitness));
        tr.appendChild(td);

        td = document.createElement("td");
        td.appendChild(document.createTextNode(game.generation.birds[0].score));
        tr.appendChild(td);

        table.appendChild(tr);

        // Auto scroll table
        var historyDiv = document.getElementById("history-div");
        historyDiv.scrollTop = historyDiv.scrollHeight;
    },

    getSurvivorNum: function() {
        return Math.ceil(Number(this._surviveRate.options[this._surviveRate.selectedIndex].value) * Data.generation.BIRD_NUM);
    },

    getBirdNum: function() {
        return Number(this._popSize.options[this._popSize.selectedIndex].value);
    },

    getMutateChance: function() {
        return Number(this._mutateChance.options[this._mutateChance.selectedIndex].value);
    },

    getActivationFunction: function() {
        return this._activationFunction.options[this._activationFunction.selectedIndex].value;
    },

    getSimSpeed: function() {
        return this._simSpeed.options[this._simSpeed.selectedIndex].value;
    }
}
