const AWS         = require('aws-sdk');
const MongoClient = require('mongodb').MongoClient;
let db            = null;

AWS.config.update({ region: 'eu-north-1' });

const ssm = new AWS.SSM();

async function getMongoDBConnectionString() {
    const params = {
      Name: '/badbankcapstone/mongodb-connection-string', 
      WithDecryption: true, // Decrypt the parameter value if it's encrypted
    };

    try {
        const response = await ssm.getParameter(params).promise();
        return response.Parameter.Value;
      } catch (error) {
        console.error('Error retrieving MongoDB connection string from Parameter Store:', error);
        throw error;
      }
    }
 
// Connect to MongoDB Atlas
async function connectToDatabase() {
    try {
      const url = await getMongoDBConnectionString();
      console.log('MongoDB Connection String:', url);
  
      const client = await MongoClient.connect(url, { useUnifiedTopology: true });
      console.log('Connected successfully to MongoDB Atlas');
  
      // Connect to your database
      db = client.db('CapstoneBadBank');
      console.log('Connected to database');
    } catch (err) {
      console.error('Error connecting to MongoDB Atlas:', err);
    }
  }
  
  // Call the function to connect
  connectToDatabase();

// create user account
function create(name, email, password){
    return new Promise((resolve, reject) => {    
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0, loggedIn: false};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });    
    })
}

// find user account
function find(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({email: email})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

// login to user account
function login(email, password){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .findOneAndUpdate(
                {email: email, password: password}, 
                { $set: {loggedIn: true}},
                { returnDocument: 'after' },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );            


    });    
}

// logout of user account
function logout(loggedIn){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .findOneAndUpdate(
                {loggedIn: true}, 
                { $set: {loggedIn: loggedIn}},
                { returnDocument: 'after' },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );            


    });    
}

// find user account
function findOne(email){
    return new Promise((resolve, reject) => {    
        db.collection('users')
        .findOne({email: email})
            .then((doc) =>  {
                // If email is found, resolve with the balance
                resolve({ balance: doc.balance });
            })
            .catch((err) => reject(err));    
    });
}

// find logged-in user account
function findLoggedIn() {
    return new Promise((resolve, reject) => {
        db.collection('users')
            .findOne({ loggedIn: true })
            .then((doc) => {
                if (doc) {
                    // If a logged-in user is found, resolve with the email and name
                    resolve({ loggedIn: true, email: doc.email, name: doc.name });
                } else {
                    // If no logged-in user is found, resolve with loggedIn as false
                    resolve({ loggedIn: false });
                }
            })
            .catch((err) => reject(err));
    });
}

// update - deposit/withdraw amount
function update(email, amount){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')            
            .findOneAndUpdate(
                {email: email},
                { $inc: { balance: amount}},
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );            


    });    
}

// all users
function all(){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}


module.exports = {create, login, logout, findOne, find, findLoggedIn, update, all};