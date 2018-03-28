class SigmoidalActivationNetwork extends Network{
    _activationFunction(x: number):number {
        return 1/(1+Math.exp(-x));
    }
}
