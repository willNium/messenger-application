const mongoClient = require('mongodb').MongoClient;
const dbConnectionUrl = 'mongodb://localhost:27017/messenger';

let _db;

module.exports = {
  connect: callback => {
    mongoClient.connect(dbConnectionUrl, function(err, db) {
      _db = db;
      return callback(err);
    });
  },
  getDb: () => _db,
  getActiveUsers: (db, cb) => {
    db.collection('activeUsers').find().toArray(cb);
  },
  getMessages: (db, cb) => {
    db.collection('messages').find().toArray(cb);
  },
  getConversation: (db, users, cb) => {
    db.collection('messages').aggregate([
      {$match: {users}}]).toArray(cb);
  },
  addActiveUser: (db, user) => {
    return db.collection('activeUsers').findOneAndUpdate({user: user},
    {
     $set: { user: user }
    },
    {
      returnOriginal: false,
      upsert: true
    })
  },
  removeActiveUser: (db, username) => {
    return db.collection('activeUsers').findOneAndDelete({user: username});
  }
};

