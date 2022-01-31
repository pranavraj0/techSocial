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
exports.postAdminView = exports.getAdminView = void 0;
const express_validator_1 = require("express-validator");
const Stock_1 = require("../models/Stock");
/**
 * List of API examples.
 * @route GET /adminview
 */
const getAdminView = (req, res) => {
    Stock_1.stock.find().then((data) => {
        const json = JSON.stringify(data);
        res.render("adminview", { title: "Admin View", stocks: data });
    }).catch((err) => {
        throw err;
    });
};
exports.getAdminView = getAdminView;
const postAdminView = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let tick;
    let num;
    let add1;
    /*ajax below
    res.json([{
        add1: req.body.name,
        add5: req.body.designation,
        custom: req.body.custom,
        submit: req.body.submit,
        resetprices: req.body.resetprices,
        resetall: req.body.resetall

     }])*/
    if (req.body.submit) {
        yield express_validator_1.check("custom", "Can only add a numeric amount of stocks!").isNumeric().run(req);
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            req.flash("errors", errors.array());
            return res.redirect("adminview");
        }
    }
    if (req.body.add1 || req.body.add5 || req.body.submit) {
        if (req.body.add1) {
            tick = req.body.add1;
            num = 1;
        }
        else if (req.body.add5) {
            tick = req.body.add5;
            num = 5;
        }
        else if (req.body.submit) {
            tick = req.body.submit;
            num = req.body.custom;
        }
        Stock_1.stock.updateOne({ ticker: tick }, { $inc: { Amount: num } }).then((obj) => {
            res.redirect("adminview");
        })
            .catch((err) => {
            console.log("Error: " + err);
        });
    }
    else {
        if (req.body.resetprices) {
            //add price optional
            Stock_1.stock.updateMany({}, { $set: { Price: 1, Amount: 0, PastPrices: [] } }).then(function () {
                console.log("Reset Prices");
            });
            return res.redirect("adminview");
        }
        if (req.body.resetall) {
            Stock_1.stock.deleteMany({}).then(function () {
                console.log("Reset Everything");
            });
            return res.redirect("adminview");
        }
    }
});
exports.postAdminView = postAdminView;
//# sourceMappingURL=adminview.js.map