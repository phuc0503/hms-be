const dotenv = require('dotenv');
const admin = require('firebase-admin');
const { getFirestore, Timestamp } = require('firebase-admin/firestore');
dotenv.config();

const {
    API_KEY,
    AUTH_DOMAIN,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID
} = process.env;

const serviceAccount = require('./cred.json');

const firebaseConfig = {
    credential: admin.credential.cert(serviceAccount),
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID
};

admin.initializeApp(firebaseConfig);

const db = getFirestore();

module.exports = {
    db,
    admin
}