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
exports.postAddStock = exports.getAddStock = void 0;
const express_validator_1 = require("express-validator");
require("../config/passport");
const Stock_1 = require("../models/Stock");
const getAddStock = (req, res) => {
    res.render("account/addStock", {
        title: "Create Stock"
    });
};
exports.getAddStock = getAddStock;
/**
 * Create a new stock
 * @route POST /stock
 */
const postAddStock = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("post AddStock was clicked");
    yield express_validator_1.check("ticker", "Ticker should not be longer than 5 letters").isLength({ max: 5 }).run(req);
    yield express_validator_1.check("price", "Price must be a number").isNumeric().run(req);
    let myPrice = req.body.price;
    if (req.body.price < 1 && req.body.price == undefined) {
        myPrice = 1;
    }
    else if (req.body.price > 4) {
        myPrice = 4;
    }
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        req.flash("errors", errors.array());
        return res.redirect("/addStock");
    }
    let temp = req.body.ticker;
    temp = temp.toUpperCase();
    const dup = (yield Stock_1.stock.findOne({ ticker: temp }));
    if (dup != undefined) {
        console.log("Duplicate with ticker " + temp + " was found ");
        return res.redirect("addStock");
    }
    const tester = new Stock_1.stock({
        ticker: temp,
        Price: myPrice,
        Amount: 0,
        PastPrices: [{ value: myPrice }]
    });
    tester.save();
    console.log("Added A stock with ticker " + temp + " and price " + myPrice);
    return res.redirect("addStock");
});
exports.postAddStock = postAddStock;
//# sourceMappingURL=addStock.js.map