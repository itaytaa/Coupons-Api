
const { MongoClient } = require('mongodb');
let db;
const client = new MongoClient('mongodb://localhost:27017', { useUnifiedTopology: true });
client.connect()
    .then(() => {
        db = client.db('itay_app')
        console.log('connected to DB')

    })
    .catch((e) => console.log('Could not connect to MongoDB', e))

function getDb() {
    return db
}


module.exports = { db: getDb }