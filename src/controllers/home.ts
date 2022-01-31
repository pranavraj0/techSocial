import { json } from "body-parser";
import { assert, Console } from "console";
import e, { Request, Response } from "express";
import { data } from "jquery";
import { update } from "lodash";
import { query } from "winston";
import { stock, StockDocument } from "../models/Stock";

/**
 * Home page.
 * @route GET /
 */
export const index = (req: Request, res: Response) => {
   
    stock.find().then((data) => {
        res.render("home", {title: "Home View", stocks:data,
            window: {
                instance: data
            }
        },
        );
        everyFiveSeconds();
    });
};
    

async function everyFiveSeconds(){
    try{
        const sortedStocks = await stock.find().sort({ Amount: "asc"}).exec() ;  

       // console.log(sortedStocks[0].PastPrices.length);

        for(let i = 0; i<sortedStocks.length; ++i){
            let newPrice = Math.floor((i+2)/2);
            //console.log(newPrice + " " + sortedStocks[i].ticker);
            if(newPrice>5)
                newPrice = 5;
            else if(newPrice<1)
                newPrice = 1;    
            const query = {ticker: sortedStocks[i].ticker}, 
            updates = {
                $set: { Price: newPrice },
                $push: {PastPrices: { value: newPrice}}
            };
            if (sortedStocks[i].PastPrices.length > 40) {
               const removing = await stock.updateOne({ ticker: sortedStocks[i].ticker}, { $pop: { PastPrices: -1 } }).exec();
            }
            const temp = await stock.updateOne(query,updates, {new:true}).exec();

        }
   

    }
       catch (err) {
        console.log(`findOne error--> ${err}`);
    }

}