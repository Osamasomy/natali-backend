const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompensationReport = new Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    fileName: {
        type: String,
        required: true,
    },
    ChildCare: {
        type: String,
    },
    DBInflow: {
        type: String,
    },
    salary: {
        type: String,
        required: true,
    },
    cashBonus: {
        type: String,
    },
    additionalComp: {
        type: String,
    },
    
    commuteCash: {
        type: String,
    },
    companyTicker: {
        type: String,
    },
    espp: {
        type: Object,
    },
    immidiateGain: {
        type: String,
    },
    
    totalcompensation: {
        type: String,
    },
    totalhealthBenefit: {
        type: String,
    },
    totalpension: {
        type: String,
    },
    totalpension10: {
        type: String,
    },
    totalvacation: {
        type: String,
    },
    
    
}, {
    timestamps: true
});

module.exports = mongoose.model('CompensationReport', CompensationReport);
