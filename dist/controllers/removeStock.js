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
exports.postRemovestock = exports.getRemoveStock = void 0;
require("../config/passport");
const Stock_1 = require("../models/Stock");
/**
 * Stock page.
 * @route GET /removeStock
 */
const getRemoveStock = (req, res) => {
    res.render("account/removeStock", {
        title: "Remove Stock"
    });
    console.log("Got to remove stock page");
};
exports.getRemoveStock = getRemoveStock;
/**
 * Create a new stock
 * @route POST /stock
 */
const postRemovestock = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    Stock_1.stock.deleteMany({ ticker: req.body.ticker }).then(function () {
        console.log("Deleted " + req.body.ticker);
    });
    return res.redirect("/");
});
exports.postRemovestock = postRemovestock;
//# sourceMappingURL=removeStock.js.map