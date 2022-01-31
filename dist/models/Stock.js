"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stock = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ticker = new mongoose_1.default.Schema({
    ticker: String,
    Price: Number,
    Amount: Number,
    PastPrices: [{ value: Number }]
});
exports.stock = mongoose_1.default.model("Stocks", ticker);
//# sourceMappingURL=Stock.js.map