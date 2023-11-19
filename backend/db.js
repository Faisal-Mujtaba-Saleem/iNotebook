const mongoose = require('mongoose');

const mongoURI = 'mongodb://127.0.0.1:27017/iNotebook';

const connectToMongo = () => {
    try {
        mongoose.connect(mongoURI).then((Mongoose) => {
            console.log('Connected Successfully');
            mongoose.connection.useDb('iNotebook');
        })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = connectToMongo;