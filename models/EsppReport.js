const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EsppReport = new Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    tickerName: {
        type: String,
        required: true
    },
    stockPrice: {
        type: String,
    },
    discountedPurchasePrice1: {
        type: String,
    },
    numberSharesPurchased1: {
        type: String,
    },
    gainValueatCurrentMarketPrice1: {
        type: String,
    },
    stockPriceIn1year1: {
        type: String,
    },
    preTaxGain1Year1: {
        type: String,
    },
    assumedGrowthRate: {
        type: String,
    },
    StockDiscount: {
        type: String,
    },
    SubscriptionDayPrice: {
        type: String,
    },
    PurchaseDayMarketPrice: {
        type: String,
    },
    LowerPrice: {
        type: String,
    },
    EmployeeContribution: {
        type: String,
    },
    assumedGrowthRate: {
        type: String,
    },
    fileName: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('EsppReport', EsppReport);
