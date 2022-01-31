import { Request, Response, NextFunction, Router } from "express";
import "../config/passport";
import { stock } from "../models/Stock";

/**
 * Stock page.
 * @route GET /removeStock
 */
export const getRemoveStock = (req: Request, res: Response): void => {
    res.render("account/removeStock", {
        title: "Remove Stock"
    });
    console.log("Got to remove stock page");
    

};

/**
 * Create a new stock
 * @route POST /stock
 */
export const postRemovestock = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    stock.deleteMany({ ticker: req.body.ticker }).then(function () {
        console.log("Deleted " + req.body.ticker);
    });
    return res.redirect("/");



};