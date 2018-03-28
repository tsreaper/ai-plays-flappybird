class CustomTangentActivationNetwork extends Network {
    _activationFunction(x: number): number {
        return 2 / (1 + Math.exp(-4.9 * x)) - 1;
    }
}
