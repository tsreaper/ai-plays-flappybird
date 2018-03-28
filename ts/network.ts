///<reference path="data.ts"/>
abstract class Network {
    public nodeSize = Data.network.INPUT_SIZE;
    public nodes: number[] = [];
    public edges = [];


    private _changeEdgeWeight(sn: number, fn: number) {
        this.edges[sn][fn] += Math.random() * Data.network.STEP_SIZE * 2 - Data.network.STEP_SIZE;
    }


    private _addEdge(sn: number, fn: number) {
        this.edges[sn] = this.edges[sn] || [];
        this.edges[sn][fn] = Math.random() * 2 - 1;
    }


    /**Insert a new node in the middle of an existing edge*/
    private _addNode(sn: number, fn: number) {
        ++this.nodeSize;
        this.edges[sn][this.nodeSize] = 1;
        this.edges[this.nodeSize] = this.edges[this.nodeSize] || [];
        this.edges[this.nodeSize][fn] = this.edges[sn][fn];
        this.edges[sn][fn] = 0;
    }


    public mutate() {
        let sn = Math.ceil(Math.random() * this.nodeSize);
        let fn = Math.ceil(Math.random() * (this.nodeSize + 1 - Data.network.INPUT_SIZE)) + Data.network.INPUT_SIZE;
        if (fn > this.nodeSize) {
            fn = Data.network.NODE_OUTPUT;
        }
        if (sn > fn) {
            let temp = sn;
            sn = fn;
            fn = temp;
        }

        // Check whether the two nodes are linked or not
        if (this.edges.hasOwnProperty(`${sn}`) && this.edges[sn].hasOwnProperty(fn)) {
            if (Math.random() < Data.network.ADD_NODE_CHANCE) {
                this._addNode(sn, fn);
            }
            else {
                this._changeEdgeWeight(sn, fn);
            }
        }
        else {
            this._addEdge(sn, fn);
        }
    }


    public getOutput(pipeDistance, pipeUpperPosition) {
        // Initialize the value of nodes
        this.nodes[Data.network.NODE_BIAS] = 1;
        this.nodes[Data.network.NODE_PIPE_DIS] = pipeDistance;
        this.nodes[Data.network.NODE_PIPE_UPPER] = pipeUpperPosition;
        this.nodes[Data.network.NODE_OUTPUT] = 0;
        for (let inputIdx = Data.network.INPUT_SIZE + 1; inputIdx <= this.nodeSize; inputIdx++) {
            this.nodes[inputIdx] = 0;
        }

        for (let nodeIdx = 1; nodeIdx <= this.nodeSize; nodeIdx++) {
            if (nodeIdx > Data.network.INPUT_SIZE) {
                this.nodes[nodeIdx] = this._activationFunction(this.nodes[nodeIdx]);
            }
            for (let edgeIdx in this.edges[nodeIdx]) {
                this.nodes[edgeIdx] += this.nodes[nodeIdx] * this.edges[nodeIdx][edgeIdx];
            }
        }
        return this.nodes[Data.network.NODE_OUTPUT] > 0;
    }

    /**activation function*/
    abstract _activationFunction(x: number): number;
}
