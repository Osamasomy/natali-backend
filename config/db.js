const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://usamasomy:natalia1234@cluster0.q56cs.mongodb.net/?retryWrites=true&w=majority'

// connect DB
const connecDB = async () => {

    try {
       await mongoose.connect(MONGO_URI, {});
        console.log('MongoDB Connected Successfully!')
    } catch (error) {
        console.log('Unable to connect:', error.message);
    }
}

module.exports = connecDB;