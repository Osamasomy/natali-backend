const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HealthCareReport = new Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    fileName: {
        type: String,
        required: true,
    },
    is55old: {
        type: Boolean,
        required: true
    },
    tax: {
        type: String,
        required: true
    },
    defaultVals: {
        type: Object,
    },
    planA: {
        "planName": {
            type: String,
            required: true
        },
        "planType": {
            type: String,
            required: true
        },
        "individualhsa": String,
        "employerhsa": String,
        "monthlyPremium": String,
        "annualDeductible": String,
        "outOfPocketMax": String,
        "anticipateMedicalExpenseID": String,
        "routinePreventing": {
            "isPercentage": {
                type: Boolean
            },
            "value": String,
            "deductible": Boolean,
            "heading": String
        },
        "speciallistOfficeVisit": {
            "isPercentage": {
                type: Boolean
            },
            "value": String,
            "deductible": Boolean,
            "heading": String
        },
        "diagnosticCoverage": {
            "isPercentage": {
                type: Boolean
            },
            "value": String,
            "deductible": Boolean,
            "heading": String
        },
        "imagingTests": {
            "isPercentage": {
                type: Boolean
            },
            "value": String,
            "deductible": Boolean,
            "heading": String
        },
        "inpatientVisits": {
            "isPercentage": {
                type: Boolean
            },
            "value": String,
            "deductible": Boolean,
            "heading": String
        },
        "outpatientVisits": {
            "isPercentage": {
                type: Boolean
            },
            "value": String,
            "deductible": Boolean,
            "heading": String
        },
        "emergencyRoomCare": {
            "isPercentage": {
                type: Boolean
            },
            "value": String,
            "deductible": Boolean,
            "heading": String
        },
        "generic": {
            "isPercentage": {
                type: Boolean
            },
            "value": String,
            "deductible": Boolean,
            "heading": String
        },
        "brand": {
            "isPercentage": {
                type: Boolean
            },
            "value": String,
            "deductible": Boolean,
            "heading": String
        },
        "other": {
            "isPercentage": {
                type: Boolean
            },
            "value": String,
            "deductible": Boolean,
            "heading": String
        },
    },
    planB: {
        "planName": {
            type: String,
            required: true
        },
        "planType": {
            type: String,
            required: true
        },
        "individualhsa": String,
        "employerhsa": String,
        "monthlyPremium": String,
        "annualDeductible": String,
        "outOfPocketMax": String,
        "anticipateMedicalExpenseID": String,
        "routinePreventing": {
            "isPercentage": {
                type: Boolean
            },
            "value": String,
            "deductible": Boolean,
            "heading": String
        },
        "speciallistOfficeVisit": {
            "isPercentage": {
                type: Boolean
            },
            "value": String,
            "deductible": Boolean,
            "heading": String
        },
        "diagnosticCoverage": {
            "isPercentage": {
                type: Boolean
            },
            "value": String,
            "deductible": Boolean,
            "heading": String
        },
        "imagingTests": {
            "isPercentage": {
                type: Boolean
            },
            "value": String,
            "deductible": Boolean,
            "heading": String
        },
        "inpatientVisits": {
            "isPercentage": {
                type: Boolean
            },
            "value": String,
            "deductible": Boolean,
            "heading": String
        },
        "outpatientVisits": {
            "isPercentage": {
                type: Boolean
            },
            "value": String,
            "deductible": Boolean,
            "heading": String
        },
        "emergencyRoomCare": {
            "isPercentage": {
                type: Boolean
            },
            "value": String,
            "deductible": Boolean,
            "heading": String
        },
        "generic": {
            "isPercentage": {
                type: Boolean
            },
            "value": String,
            "deductible": Boolean,
            "heading": String
        },
        "brand": {
            "isPercentage": {
                type: Boolean
            },
            "value": String,
            "deductible": Boolean,
            "heading": String
        },
        "other": {
            "isPercentage": {
                type: Boolean
            },
            "value": String,
            "deductible": Boolean,
            "heading": String
        },
    },
    
    
    
}, {
    timestamps: true
});

module.exports = mongoose.model('HealthCareReport', HealthCareReport);
