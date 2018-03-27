var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SigmoidalActivationNetwork = /** @class */ (function (_super) {
    __extends(SigmoidalActivationNetwork, _super);
    function SigmoidalActivationNetwork() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SigmoidalActivationNetwork.prototype._activationFunction = function (x) {
        return 1 / (1 + Math.exp(-x));
    };
    return SigmoidalActivationNetwork;
}(Network));
