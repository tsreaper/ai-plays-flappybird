function Network() {
    this.nodeSize = Data.network.INPUT_SIZE;
    this.nodes = [];
    this.edges = [];
}

Network.prototype = {
    mutate: function() {
        var sn = Math.ceil(Math.random() * this.nodeSize);
        var fn = Math.ceil(Math.random() * (this.nodeSize + 1 - Data.network.INPUT_SIZE)) + Data.network.INPUT_SIZE;
        if (fn > this.nodeSize) {
            fn = Data.network.NODE_OUTPUT;
        }
        if (sn > fn && fn != Data.network.NODE_OUTPUT) {
            var t = sn;
            sn = fn;
            fn = t;
        }

        // Check whether the two nodes are linked or not
        if (this.edges.hasOwnProperty(sn) && this.edges[sn].hasOwnProperty(fn)) {
            if (Math.random() < Data.network.ADD_NODE_CHANCE) {
                this._addNode(sn, fn);
            } else {
                this._changeEdgeWeight(sn, fn);
            }
        } else {
            this._addEdge(sn, fn);
        }
    },

    getOutput: function(pipeDis, pipeUpper, pipe2Upper) {
        // Initialize the value of nodes
        this.nodes[Data.network.NODE_BIAS] = 1;
        this.nodes[Data.network.NODE_PIPE_DIS] = pipeDis;
        this.nodes[Data.network.NODE_PIPE_UPPER] = pipeUpper;
        this.nodes[Data.network.NODE_PIPE2_UPPER] = pipe2Upper;
        this.nodes[Data.network.NODE_OUTPUT] = 0;
        for (var i = Data.network.INPUT_SIZE + 1; i <= this.nodeSize; i++) {
            this.nodes[i] = 0;
        }

        for (var i = 1; i <= this.nodeSize; i++) {
            if (i > Data.network.INPUT_SIZE) {
                this.nodes[i] = this._activation(this.nodes[i]);
            }
            for (var j in this.edges[i]) {
                this.nodes[j] += this.nodes[i] * this.edges[i][j];
            }
        }

        return this.nodes[Data.network.NODE_OUTPUT] > 0;
    },

    setActivation: function(f) {
        this._activation = f;
    },

    _activation: function(x) {
        return 2 / (1 + Math.exp(-4.9 * x)) - 1;
    },

    _changeEdgeWeight: function(sn, fn) {
        this.edges[sn][fn] += Math.random() * Data.network.STEP_SIZE * 2 - Data.network.STEP_SIZE;
    },

    _addEdge: function(sn, fn) {
        this.edges[sn] = this.edges[sn] || [];
        this.edges[sn][fn] = Math.random() * 2 - 1;
    },

    // Insert a new node in the middle of an existing edge
    _addNode: function(sn, fn) {
        this.edges[sn][++this.nodeSize] = 1;
        this.edges[this.nodeSize] = this.edges[this.nodeSize] || [];
        this.edges[this.nodeSize][fn] = this.edges[sn][fn];
        this.edges[sn][fn] = 0;
    }
}

var Activation = {
    get: function(name) {
        switch (name) {
        case Data.activation.SIGMOID:
            return function(x) { return 1 / (1 + Math.exp(-x)); }
        case Data.activation.ARCTAN:
            return function(x) { return 1 / (Math.pow(x, 2) + 1); }
        case Data.activation.CUSTOM_TANGENT:
            return function(x) { return 2 / (1 + Math.exp(-4.9 * x)) - 1; }
        case Data.activation.HYPERBOLIC_TANGENT:
            return function(x) { return 1 / (1 + Math.exp(-2 * x)); }
        case Data.activation.RELU:
            return function(x) { return Math.max(0, x); }
        default:
            return function(x) { return x; }
        }
    }
}
