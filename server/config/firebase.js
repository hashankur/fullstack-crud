const fs = require("firebase-admin");

const serviceAccount = require("../fullstack-crud-firebase-adminsdk-lcm31-558896fad4.json");

fs.initializeApp({
  credential: fs.credential.cert(serviceAccount),
});

const db = fs.firestore();

module.exports = { db };
