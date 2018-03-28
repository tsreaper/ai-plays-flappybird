class HyperbolicTangentActivationNetwork extends Network {
    _activationFunction(x: number): number {
        return 1 / (1 + Math.exp(-2 * x));
    }
}
