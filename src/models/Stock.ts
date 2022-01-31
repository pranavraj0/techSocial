import mongoose, { Schema } from "mongoose";

const ticker = new mongoose.Schema({
    ticker: String,
    Price: Number,
    Amount: Number,
    PastPrices: [{value: Number}]
});


export interface StockDocument extends mongoose.Document {
    ticker: string,
    Price: number,
    Amount: number,
    PastPrices: [{value: number}]
}

export const stock = mongoose.model<StockDocument>("Stocks", ticker);