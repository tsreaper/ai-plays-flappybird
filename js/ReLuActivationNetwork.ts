class ReLuActivationNetwork extends Network {
    _activationFunction(x: number): number {
        return Math.max(0, x);
    }
}
