"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
const Stock_1 = require("../models/Stock");
/**
 * Home page.
 * @route GET /
 */
const index = (req, res) => {
    Stock_1.stock.find().then((data) => {
        res.render("home", { title: "Home View", stocks: data,
            window: {
                instance: data
            }
        });
        everyFiveSeconds();
    });
};
exports.index = index;
function everyFiveSeconds() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sortedStocks = yield Stock_1.stock.find().sort({ Amount: "asc" }).exec();
            // console.log(sortedStocks[0].PastPrices.length);
            for (let i = 0; i < sortedStocks.length; ++i) {
                let newPrice = Math.floor((i + 2) / 2);
                //console.log(newPrice + " " + sortedStocks[i].ticker);
                if (newPrice > 5)
                    newPrice = 5;
                else if (newPrice < 1)
                    newPrice = 1;
                const query = { ticker: sortedStocks[i].ticker }, updates = {
                    $set: { Price: newPrice },
                    $push: { PastPrices: { value: newPrice } }
                };
                if (sortedStocks[i].PastPrices.length > 40) {
                    const removing = yield Stock_1.stock.updateOne({ ticker: sortedStocks[i].ticker }, { $pop: { PastPrices: -1 } }).exec();
                }
                const temp = yield Stock_1.stock.updateOne(query, updates, { new: true }).exec();
            }
        }
        catch (err) {
            console.log(`findOne error--> ${err}`);
        }
    });
}
//# sourceMappingURL=home.js.map