const firebase = require('firebase');
const config = require('./firebase');

const db = firebase.initializeApp(config.firebaseConfig);

module.exports = db;