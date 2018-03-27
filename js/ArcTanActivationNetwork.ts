class ArcTanActivationNetwork extends Network {
    _activationFunction(x: number): number {
        return 1 / (Math.pow(x, 2) + 1);
    }
}
