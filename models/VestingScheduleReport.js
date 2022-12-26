const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VestingSchedule = new Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    type: {
        type: String,
        required: true
    },
    tickerName: {
        type: String,
        required: true
    },
    stockPrice: {
        type: String,
    },
    numOfOptionsGrandted: {
        type: String,
    },
    strikePrice: {
        type: String,
    },
    stockOptionsGrantDate: {
        type: String,
    },
    evaluateDate: {
        type: String,
    },
    vestingPeriod: {
        type: String,
    },
    cliff: {
        type: String,
    },

    optionsVesting: {
        type: String,
    },
    isVestingOption: {
        type: String,
    },
    currentMarketPrice: {
        type: String,
    },
    typeOption: {
        type: String,
    },
    numOfShares: {
        type: String,
    },
    fileName: {
        type: String,
        required: true,
    },
    _evaluateDate: {
        type: String,
    },
    optionsVestingPerMonth: {
        type: String,
    },
    numberOfMonths0: {
        type: String,
    },
    numberOfMonths1: {
        type: String,
    },
    numberOfMonths2: {
        type: String,
    },
    numberOfMonths3: {
        type: String,
    },
    optionsVested0 : {
        type: String,
    },
    fundsToExcOptionsVested0: {
        type: String,
    },
    immidiateGain0: {
        type: String,
    },
    typeOption: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('VestingSchedule', VestingSchedule);
