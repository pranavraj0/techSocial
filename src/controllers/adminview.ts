"use strict";

import graph from "fbgraph";
import { Response, Request, NextFunction, Router } from "express";
import { body, check, validationResult } from "express-validator";
import { stock, StockDocument } from "../models/Stock";
import mongoose, { Mongoose } from "mongoose";
import { Db } from "mongodb";
import { round } from "lodash";
import { json } from "body-parser";


/**
 * List of API examples.
 * @route GET /adminview
 */
export const getAdminView = (req: Request, res: Response) => {

    stock.find().then((data) => {
        const json = JSON.stringify(data);
        res.render("adminview", {title : "Admin View", stocks: data});
    }).catch((err)=>{
        throw err;
    });    
};

export const postAdminView = async (req: Request, res: Response , next : NextFunction): Promise<void> => {
    let tick: string;
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
       
        await check("custom", "Can only add a numeric amount of stocks!").isNumeric().run(req);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            req.flash("errors", errors.array());
            return res.redirect("adminview");
        }
    }

    if (req.body.add1 || req.body.add5 || req.body.submit) {
        if (req.body.add1) {
            tick = req.body.add1;
            num = 1;
        } else if (req.body.add5) {
            tick = req.body.add5;
            num = 5;
        } else if (req.body.submit) {
            
            tick = req.body.submit;
            num = req.body.custom;
        }
    
        stock.updateOne({ticker: tick}, {$inc: {Amount: num}}).then((obj) => {
            res.redirect("adminview");
        })
        .catch((err) => {
            console.log("Error: " + err);
        });
    } else {
        if (req.body.resetprices) {
            //add price optional
            stock.updateMany({}, {$set: {Price: 1, Amount: 0, PastPrices: []}}).then(function () {
                console.log("Reset Prices");
            });
            return res.redirect("adminview");
        }

        if (req.body.resetall) {
            stock.deleteMany({ }).then(function () {
                console.log("Reset Everything");
            });
            return res.redirect("adminview");
        }
    }

};