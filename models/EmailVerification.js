const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emailSchema = new Schema({
    token: { type: String, required: true },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        // ref: 'User',
        required: true
    },
    expire_at: {type: Date, default: Date.now, expires:1800} 
},
{
    timestamps: true
});


const EmailVerification = mongoose.model('EmailVerification', emailSchema);

module.exports = EmailVerification;