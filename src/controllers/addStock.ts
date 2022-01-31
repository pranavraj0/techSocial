import { Request, Response, NextFunction, Router } from "express";
import { body, check, validationResult } from "express-validator";
import "../config/passport";
import { stock, StockDocument } from "../models/Stock";


export const getAddStock = (req: Request, res: Response): void => {
    res.render("account/addStock", {
        title: "Create Stock"
    });
};



/**
 * Create a new stock
 * @route POST /stock
 */
export const postAddStock = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log("post AddStock was clicked");
    await check("ticker", "Ticker should not be longer than 5 letters").isLength({ max: 5 }).run(req);
    await check("price", "Price must be a number").isNumeric().run(req);
    
    let myPrice: number = req.body.price;

    if (req.body.price < 1 && req.body.price == undefined){
        myPrice = 1;
    }
    else if(req.body.price > 4){
        myPrice = 4;
    }
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.flash("errors", errors.array());
        return res.redirect("/addStock");
    }
    let temp: string = req.body.ticker;
    temp = temp.toUpperCase();
    const dup = (await stock.findOne({ticker: temp}));
    if(dup != undefined){
        console.log("Duplicate with ticker " + temp + " was found ");
        return res.redirect("addStock");
    }
    const tester = new stock({
        ticker: temp,
        Price: myPrice,
        Amount: 0,
        PastPrices: [{value: myPrice }]
    });
    tester.save();

    console.log("Added A stock with ticker " + temp + " and price " + myPrice );
    return res.redirect("addStock");
};
